# My Pluralsight Version of John Papa/Ward Bell Quickstart
This repo follows the entire pluralsight course all the way through barrels. 
It works with release ng2 and the docker file is changed so my local src is 2-way bound in docker container. 

The original is at https://github.com/johnpapa/pbp-a2-ward

If 'npm start' doesn't actually start due to tsc errors, you 
need to comment out the customer service fns and customer component fns
because typescript doesn't like the function signatures.

// customers.component.ts, lines 34-43
/*

this.customersObservable = this._customerService.getCustomersObservable()
.catch((err) => {
    console.log(err);
    return Observable.of(err); // eating error
});

this.customersPromise = this._customerService.getCustomersPromise()
.catch((err) => {
    console.log(err);
}); 
*/

Then run 'npm start'.

Then put those fns back in. The files should still be watched so tsc runs, but wihtout errors. 

## ngRx branch
blog: http://onehungrymind.com/build-better-angular-2-application-redux-ngrx/
github: https://github.com/onehungrymind/fem-ng2-ngrx-app/blob/simple-data-flow/client/src/app.ts

npm install @angular/core @ngrx/core --save
npm install @ngrx/store --save