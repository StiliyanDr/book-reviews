# book-reviews
A web application displaying books and their reviews on Amazon

## Tech stack
- DB  
  MongoDB  
- Backend  
  Python 3.12, Fast API
- Frondend  
  Angular, Typescript
- Testing  
  * backend  
    Unit and integration testing is done with pytest
  * frontend  
    Unit testing is done with Jasmine  
    E2E testing is done with Playwright  

## Data
The book reviews data can be found on [Kaggle](https://www.kaggle.com/datasets/mohamedbakhet/amazon-books-reviews/data?select=books_data.csv).  

One of the limitations of the dataset is that it connects a book to its reviews by title. This is not a good practice, as titles are not unique. 
To address this issue, the database is initialised by linking reviews to books by their DB IDs.  
