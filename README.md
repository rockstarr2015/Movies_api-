# ExpressJS Movies REST API  

This is ExpressJS movies REST API using MongoDB and Pug template engine and bootstrap 4. 

## Requirements ##
* ExpressJS 4.15.3
* Mongoose 4.10.8
* Pug 2.0
* Nodemon 1.11

## How to use ##
App stars from index.js, all the templates are inside views folder.

Followings are Routes that can be used to get data  
```' /getMovies'  for getting all the movies records  ```

```'/getMovies/name' for getting specific movie record.```
Movie name goes after getMovies. Movie name with multiple words are appended to url using underscore in between two movie words. For example, 'The_Godfather'. 

```'/insertMovies' for inserting new document into the DB ```

```'/updateMovies' for updating movie record  ```

```'/delete/name' for deleting movie from DB ```

For inserting and updating document data is submitted via html forms using Pug and bootstrap 4.
