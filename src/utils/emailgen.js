let combinedEmails = [];
let duplicateEmails = [];
let originalEmails = [];

function shuffle(a) {
    let j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

function combine() {
	shuffle(duplicateEmails);
	combinedEmails = originalEmails.concat(duplicateEmails);
	//reduceEmails();
}

(function makeEmails() {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5000; i++ ) {
		let newEmail = Math.random().toString(36).substr(2, 7) + "@email.com";
      	originalEmails.push(newEmail);
      	duplicateEmails.push(newEmail);
    }
    combine();
})();

module.exports = combinedEmails;