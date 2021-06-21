import * as core from '@actions/core';
import * as github from '@actions/github';
import * as fs from 'fs';
const filePath = core.getInput('path')
import { request } from '@octokit/request';
import { Octokit } from "@octokit/core";
fs.readdir('./', (err, files) => {
  console.log("entered");
  if (err)
    console.log(err);
  else {
    for(let i = 0; i < files.length; i++)
      console.log(files[i]);
    const includesReadme = files.includes('README.md');

    if(includesReadme){

      console.log("Found readme");
      fs.readFile('./README.md', function (err, data) {
      //check example
      if(data.includes('Example'))
        console.log("found example");
      else
        console.log("Example not found");
                
      //check contribution
      if(data.includes('Contribution'))
        console.log("found contribution");
                 
      else{
        core.setFailed("Contribution not found");
      }
      });


      }
    else
      console.log("No Readme");

      //code owners in .github

    fs.readdir('./.github', (err, files) => {
      const includesCodeOwners = files.includes('CODEOWNERS');
      if(includesCodeOwners)
        console.log("Code owners present");
      else
        console.log("code owners file absent");
    })

      //dont have node modules in master for .ts
    var flag=0;
    fs.readdir('./src',(err, filess ) => {
      for(let i = 0; i < filess.length; i++){
        if(getExtension(filess[i]) === "ts"){
          flag=1;
          fs.readdir('./', (err, files) => {
            const includesnm = files.includes('node_modules');
            if(includesnm)
              console.log("node_modules present in master");
            else
              console.log("node_modules not present in master");
          })
          break;
        }
      }
      if(flag===0)
        console.log("not dot ts");
    })

    //check pr protection in branch
  

      start();
    
    }})

    function getExtension(filename: string) {
      return filename.substring(filename.lastIndexOf('.')+1, filename.length)   
    }


    async function start(){ 
        console.log("entered start");
        console.log(github.context.repo.repo)
      try{
      var secret_token = core.getInput('GITHUB_TOKEN');
      const octokit = new Octokit({
        auth: secret_token,
      });
      if(  secret_token === "")
      {console.log("blank value");}
        else
        {console.log("non blank" + secret_token);}
     
        const result = await octokit.request('GET /repos/{owner}/{repo}/branches',{
         owner: 'ishitachawla',
         repo: 'Requirement-testing',
        // branch: 'main',
         headers : { Authorization: 'Bearer ' + secret_token
                     
         }
      });
      for(let i=0;i<result.data.length;i++){
        console.log(result.data[i].name)
        if(result.data[i].name.substring(0,9)==='releases/'){
          console.log('rel present')
        }
      }
      console.log("yo");
      return result;
  }
      catch(err){
        console.log(err);
        return "error";
  }
      
        }
    
