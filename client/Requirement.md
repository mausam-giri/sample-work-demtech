# Requirements

The task is to create a mailing scheduling feature in NextJS.

A mailing is an email based campaign sent to groups of users. It is created, reviewed and scheduled in advance and sent on a particular date/time.

A mailing includes:

- the template of the mail (mailer)
- the list to which it should be sent to (list)
- the day and time at which it should be sent (schedule)

Assumptions:

- You can assume that mailers (templates) exist and can be fetched via an API call. You need to only fetch the id and name of the mailer (the actual content of the mailer can be picked up by the mail sending module)
- You can assume that lists exist and can be fetched via an API call. You need to only fetch the id and name of the list (the actual emails in the list can be picked up by the mail sending module).
- You can assume that an API exists to do CRUD operations of the mailing (with the mailer id, list id, and schedule details)
- You can mock the function of the above APIs (using any technology you prefer) to build a working demo that you will showcase in the interview phase (if selected).

Use the latest best practices in the NextJS ecosystem for the core task.

Core deliverables for this test include:

- Source Code on github with commit history
- README file on how to setup and run the project
- (Desirable) URL of publicly accessible running instance
