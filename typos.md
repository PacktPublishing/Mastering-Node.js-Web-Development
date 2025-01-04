# Typos for *Mastering Node.js Web Development*

This file contains smaller errors that are unlikely to prevent the code examples from working and which I will correct in the next edition of the book. See [this](errata.md) file for mistakes that prevent the code examples from working as expected.

---

**Chapter 3**

On page 30, this sentence:

>The tsc-watc1h package does the same thing for TypeScript files, and the typescript package
contains the TypeScript compiler. 

should be:

>The **tsc-watch** package does the same thing for TypeScript files, and the typescript package
contains the TypeScript compiler. 

(Thanks to Cesar Rodriguez Olvera for reporting this problem)

---

**Chapter 5**

On page 132, this sentence in the description of HTTP Strict Transport Security:

>The HTTP Strict Transport Security (HSTS) header can 
be used to tell browsers **not** to only use HTTPS requests for a domain

should be:

>The HTTP Strict Transport Security (HSTS) header can 
be used to tell browsers to only use HTTPS requests for a domain

---

**Chapter 6**

On page 146, this sentence:

>In this chapter, I will continue to use the webapp project created in Chapter 4 and modified in 
Chapter 3.

should be:

In this chapter, I will continue to use the webapp project created in Chapter 4 and modified in 
Chapter **5**.

---

**Chapter 7**

On page 182, this sentence:

>In this chapter, I deliberately create an XSS vulnerability in the example application, demonstrate 
how it can be exploited, and then use a content security browser to provide the browser with the 
information it needs to stop the application from being abused.

should be:

>In this chapter, I deliberately create an XSS vulnerability in the example application, demonstrate 
how it can be exploited, and then use a content security **policy** to provide the browser with the 
information it needs to stop the application from being abused.

---

**Chapter 8**

On page 231, the addition of the async keyword in `Listing 8.14` isn't highlighted:

test("readHandler tests", **async** (testCtx) => {

(Thanks to Jonathan DePaul for reporting this problem)

---


