const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const filePath = core.getInput('path')
const { request } = require('@octokit/request');
const { Octokit } = require("@octokit/core");
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
                 
      else
        console.log("Contribution not found");
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
  //        console.log("dot ts");
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

    //check commit protection in branch
  
    async function start(){ 
      console.log("entered start");
    try{
    var secret_token = core.getInput('GITHUB_TOKEN');
    const octokit = new Octokit({
      auth: secret_token,
    });
    if(  secret_token === "")
    {console.log("blank value");}
      else
      {console.log("non blank" + secret_token);}
   
      const result = await octokit.request('GET /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews',{
       owner: 'ishitachawla',
       repo: 'Requirement-testing',
       branch: 'main',
       headers : { Authorization: 'Bearer ' + secret_token
                   
       }
    }); 
    console.log(result);
    console.log("yo");
    return result;
}
    catch(err){
      console.log(err);
      return "error";
}


    //end check commit
    
      }
      start();
    
    }})
    function getExtension(filename) {
      return filename.substring(filename.lastIndexOf('.')+1, filename.length)   // The function returns the product of p1 and p2
    }
    
