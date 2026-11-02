// The "?" Make the age and name optional 
// but uses it as they are always there , 
// typescript catches this 
// The Fix : is you
//  either check it out remove the "?" 
//  
// 2nd is to Fixed(2) 
// turns the age into(25:00) which is odd for an age instead use (user.age).
// this are 2 changes 

//1st Thing that hit my mind when i review the code 
// function processUser(user?: { name: string; age?: number }) {
//   if (!user) {
//     console.log('No user provided');
//     return;
//   }

//   const formattedAge = user.age !== undefined ? user.age.toFixed(2) : 'unknown';
//   console.log(user.name + ' is ' + formattedAge + ' years old');
// }

// processUser();




//More Optimal Solution 
function processUser(user?: { name: string; age?: number }) {
  const name = user?.name ?? 'Unknown user';
  const formattedAge = user?.age?.toFixed(2) ?? 'unknown';
  console.log(`${name} is ${formattedAge} years old`);
}

// The ternary only calls toFixed(2) 
// when age actually exists, and uses 'unknown' otherwise.

