const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const filePath = core.getInput('path')
const { request } = require('@octokit/request');
//const request = require("request-promise");
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
    fs.readdir('./src',(err, filess ) => {
      const isdotts = filess.includes('*.ts');
      if(isdotts){
        console.log("dot ts");
        fs.readdir('./', (err, files) => {
          const includesnm = files.includes('node_modules');
          if(includesnm)
            console.log("nm present error");
          else
            console.log("nm absent");
        })
      }
      else
        console.log("not .ts");
    })

    //check commit protection in branch
  //  const octokit = new Octokit({ auth: githubToken });

  //   async function run(){
  //   try{
  //   const SECRET_TOKEN = core.getInput('GITHUB_TOKEN');
  //   console.log(SECRET_TOKEN);
  //   const protectionOptions = {
  //     url: 'https://api.github.com/repos/ishitachawla/Requirement-testing/branches/main/protection/required_signatures',
  //     headers: {
  //       Accept: "application/vnd.github.zzzax-preview+json",
  //       Authorization: 'Bearer ' + SECRET_TOKEN,
  //       'user-agent': 'node.js',
  //       mediaType: {
  //         previews: [
  //           'zzzax'
  //         ]
  //       }
  //     },
  //   };
  //   let protection = await request.get(protectionOptions);
  //   let result = JSON.parse(protection);
  //   console.log(result);
  //   console.log("sip");
  // }
  // catch(error){console.log(error);}
  // }
  // run();
  //   async function start() {
  //     console.log("check commit entered");
  //     const promise = new Promise((resolve, reject) => {
  //     request('GET /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures', {
  //     owner: 'ishitachawla',
  //     repo: 'Requirement-testing',
  //     branch: 'main',
  //     mediaType: {
  //       previews: [
  //         'zzzax'
  //       ]
  //     }
  //   })
    
  //   .catch(reject);
  //   console.log(promise);
  // })

  // start();
  
    async function start(){ 
      console.log("entered start");
    try{
    var secret_token = core.getInput('GITHUB_TOKEN');
//    const regex = /^(.*)github.com:(.*)\/(.*)\.git$/; 
    //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
    if(  secret_token === "")
    {console.log("blank value");}
      else
      {console.log("non blank" + secret_token);}
   
      const result = await request('GET /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews',{
       owner: 'ishitachawla',
       repo: 'Requirement-testing',
       branch: 'main',
       headers : { Authorization: 'Bearer ' + secret_token
                   
       }
//     mediaType: {
//       previews: [
//         'zzzax'
//       ]
//     }
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
