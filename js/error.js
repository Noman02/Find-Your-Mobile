fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))


// try catch example

// with async 
try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users'),
    const data = await res.json();
    console.log(data)
}
catch {

}