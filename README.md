# My Pluralsight Version of John Papa/Ward Bell Quickstart
This repo follows the entire pluralsight course all the way through barrels. 
It works with release ng2 and the docker file is changed so my local src is 2-way bound in docker container. 

The original is at https://github.com/johnpapa/pbp-a2-ward

If 'npm start' doesn't actually start due to tsc errors, you 
need to comment out the customer service fns and customer component fns
because typescript doesn't like the function signatures.

Then run 'npm start'.

Then put those fns back in. The files should still be watched so tsc runs, but wihtout errors. 