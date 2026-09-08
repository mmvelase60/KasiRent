import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from '../mobile/node_modules/typescript/lib/typescript.js';

// Inspect emitted JSX: same-line spaces become real string children on native Views.
function invalidText(code) {
 const emitted=ts.transpileModule(code,{compilerOptions:{jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText;
 const source=ts.createSourceFile('screen.js',emitted,ts.ScriptTarget.Latest,true);
 const invalid=[];
 function walk(n){
  if(ts.isCallExpression(n)&&['_jsx','_jsxs'].includes(n.expression.getText(source))&&n.arguments[0]?.getText(source)!=='Text'){
   const props=n.arguments[1];
   if(props&&ts.isObjectLiteralExpression(props))for(const prop of props.properties){
    if(ts.isPropertyAssignment(prop)&&prop.name.getText(source)==='children'){
     const children=ts.isArrayLiteralExpression(prop.initializer)?prop.initializer.elements:[prop.initializer];
     for(const child of children)if(ts.isStringLiteral(child)&&child.text.length)invalid.push(child.text);
    }
   }
  }
  ts.forEachChild(n,walk);
 }
 walk(source);return invalid;
}
test('native screens do not render literal text or spaces outside Text',()=>{
 assert.deepEqual(invalidText('const Screen=()=> <View><Text>OK</Text> <Text>Next</Text></View>'),[' ']);
 assert.deepEqual(invalidText('const Screen=()=> <View><Text>OK</Text>\n<Text>Next</Text></View>'),[]);
 const code=readFileSync(new URL('../mobile/src/Main.tsx',import.meta.url),'utf8');
 assert.deepEqual(invalidText(code),[]);
});
