# CHURCH WEBSITE REST API

    NodeJs + Express, Sequelize + mysql2

## Introduction

It is well known that we are living in a world of change. A world where technology is in constant growth and ahead of every second.
Things are becoming automated. Maybe computers have just taken over the world. Well, am just kidding.

In a normal church environment, we have members of the church, visitors, staff/pastors who are the actors in all operation of the church. These operations include but not limited to the following:
    *User Registration(member, visitor, staff)
    * User attendance record keeping.
    *Giving and Donations.
    * Event management
    * Just but a few
Just like sections in a library, a church may have ministries that are responsible for managing the operations in a church. This may include children and youth development, adult counselling, bible study and prayers, resource keeping, sermon planning, event planning, e.t.c.

## About this api

This is a  REST API that is meant to automate most common church operations, With this api, you can:
    *Register a user
    * Give or Donate to the church
    *Resource management
    * Share sermons with world
    * just in a gist
This API is meant to give you a basic startup for the development of a more complex application

## Credits

### Author

Name: *Wachiye Jeremiah Siranjofu*
Email: *siranjofuw@gmail.com*
Language Used: *NodeJs*

## API consumption

The following are the end points in this api
**NOTE**: 1. \* means *required*
          2. ~  means *unique*
          3. All images should be in form of a string. basically, a url
          4. All files must be submitted in a field named *file*. Each POST/PUT request accepts only one file.

### Users

A user can be a visitor, member or staff. A user can play a role of being a member or a leader
**Fields**: *first_name\*, last_name\*, ~email, ~phone, dob\*, age\*, gender\*, type, role, image, ~username\*, password\**

#### Users api routes

REQUEST   | END POINT                      | DESCRIPTION                     |
--------- |--------------------------------|---------------------------------|
| POST    | /users/                        | add new user
| GET     | /users/                        | retrieve all users
| GET     | /users/:id                     | retrieve a single user with id
| PUT     | /users/:id                     | update a single user with id
| DELETE  | /users/                        | delete all users
| DELETE  | /users/:id                     | delete a single user with id
| GET     | /users/today                   | retrieve all users added today

### Ministries

In most cases, a ministry has many members and a single leader with each ministry being responsible for a unique task in the church

**Fields**: *name\*, description\*, image*

#### Ministries api routes

REQUEST   | END POINT                      | DESCRIPTION                     |
--------- |--------------------------------|---------------------------------|
| POST    | /ministries/                   | add new ministry
| GET     | /ministries/                   | retrieve all ministries
| GET     | /ministries/:id                | retrieve a single ministry with id
| PUT     | /ministries/:id                | update a single ministry with id
| DELETE  | /ministries/                   | delete all ministries
| DELETE  | /ministries/:id                | delete a single ministry with id

### Events

Events in the church can be a wedding, a fundraising, baptism, etc. Each event is scheduled by a ministry. An event may have many participants. An event may include funds.

**Fields**: *title\*, description\*, from, to, image\*, ministry_id*

#### Events api routes

REQUEST   | END POINT                      | DESCRIPTION                     |
--------- |--------------------------------|---------------------------------|
| POST    | /events/                       | add new event
| GET     | /events/                       | retrieve all events
| GET     | /events/:id                    | retrieve a single event with id
| PUT     | /events/:id                    | update a single event with id
| DELETE  | /events/                       | delete all events
| DELETE  | /events/:id                    | delete a single events with id
| GET     | /events/today                  | retrieve all events added today
| GET     | /events/upcoming               | retrieve all upcoming events
| GET     | /events/finished               | retrieve all finished events

### Sermons

Sermons have already been aired can be shared in form of text for the public audience.
**Fields**: *title\*, description\*, verse, content\**
*Description* can be the bible quote from the verse or a brief text about what is in the content.

#### Sermons api routes

REQUEST   | END POINT                      | DESCRIPTION                     |
--------- |--------------------------------|---------------------------------|
| POST    | /sermons/                      | add new sermon
| GET     | /sermons/                      | retrieve all sermons
| GET     | /sermons/:id                   | retrieve a single sermon with id
| PUT     | /sermons/:id                   | update a single sermons with id
| DELETE  | /sermons/                      | delete all sermons
| DELETE  | /sermons/:id                   | delete a single sermon with id

### Resources

Resources such as `e-books`, `stories` shared by users or `forms` can be captured for easy access.
**Fields**: *type\*, title\*, description\*, content\*, url, image\**
For resource of type *forms*, the url is required, and the content is same as the description.

#### Resources api routes

REQUEST   | END POINT                      | DESCRIPTION                     |
--------- |--------------------------------|---------------------------------|
| POST    | /resources/                    | add new resource
| GET     | /resources/                    | retrieve all resources
| GET     | /resources/:id                 | retrieve a single resource with id
| PUT     | /resources/:id                 | update a single resource with id
| DELETE  | /resources/                    | delete all resources
| DELETE  | /resources/:id                 | delete a single resource with id

### Messages

This will capture the contact messages that users post to the church website for help and other inquiries.
A message includes: *name\*, email\, phone\*, message\**

#### Messages api routes

REQUEST   | END POINT                      | DESCRIPTION                     |
--------- |--------------------------------|---------------------------------|
| POST    | /messages/                     | add new message
| GET     | /messages/                     | retrieve all messages
| GET     | /messages/:id                  | retrieve a single message with id
| PUT     | /messages/:id                  | update a single message with id
| DELETE  | /messages/                     | delete all messages
| DELETE  | /messages/:id                  | delete a single message with id

### Donations

`Donations` to the church for activity and ministry support, `Tithing` and `offering` can be captured.
Primarily, donations require membership.
This can implemented via an online payment system such a PayPal or Mpesa.
**Fields**: *user_id\*, type\*, purpose\*, transaction_id\*, amount\**
Types include *Donation, Tithing, Offering*

#### Donation api routes

REQUEST   | END POINT                      | DESCRIPTION                     |
--------- |--------------------------------|---------------------------------|
| POST    | /donations/                    | add new donation
| GET     | /donations/                    | retrieve all donations
| GET     | /donations/:id                 | retrieve a single donation with id
| GET     | /donations/today               | retrieve all donations added today
| PUT     | /donations/:id                 | update a single donation with id
| DELETE  | /donations/                    | delete all donations
| DELETE  | /donations/:id                 | delete a single donation with id

### Church

Every church has a name, a tag line and an address. Other details include the email, phone and image. Other churches have Missions, Visions, and core values among other details.
**Fields**: *name\*, tag\*, email, phone, address\*, image\**

#### Church api routes

REQUEST   | END POINT                      | DESCRIPTION                     |
--------- |--------------------------------|---------------------------------|
| POST    | /church/                       | add new church
| GET     | /church/                       | retrieve all churches
| GET     | /church/:id                    | retrieve a single church with id
| PUT     | /church/:id                    | update a single church with id
| DELETE  | /church/                       | delete all church
| DELETE  | /church/:id                    | delete a single church with id

### Authentication

Most routes that involve POST/PUT/DELETE have been secured with an authentication method that grants a user a token for accessing the routes.
To be authenticated, a user has to login via */api/auth/login* with a POST request, with his/her username and password. Upon successful login, a user is given the access token.

#### Authentication api routes

REQUEST   | END POINT                      | DESCRIPTION                     |
--------- |--------------------------------|---------------------------------|
| POST    | /auth/login                    | Logs in a user and give an access token
| POST    | /auth/logout                   | Logs out a user and deletes the access token
