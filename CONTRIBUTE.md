# Contributing to [beyond-ui]

Welcome to [beyond-ui]! We're thrilled that you are interested in contributing. Before you get started, please take a moment to review the following guidelines.

#

#### !! NEVER PUSH DIRECTLY TO THE `main` BRANCH 🚨
#### !! NEVER MERGE YOUR PR TO THE `main` BRANCH WITHOUT APPROVAL 🚨
##### !! For Windows Users use the GIT BASH Terminal for the commands

#

# Git Workflow

### 1. Clone the Repository (Optional if you have the repo already)

Clone the forked repository to your local machine using the following command:

```bash
git clone https://github.com/your-username/project-name.git
```

### 2. Create a Branch

Before making changes, create a new branch (See the Conventions below) for your feature or bug fix:

```bash
git checkout main; git fetch origin; git pull origin main; npm i; git checkout -b <branch>
```

You can use a descriptive branch name related to your changes.

### 3. Make Changes Locally

You can make your desired changes to the codebase locally using your preferred text editor or IDE.

### 4. Commit Changes

Once you're satisfied with the changes, commit them using clear and concise commit **messages**:

```bash
git add -A && git commit -m "<commitMessage>"
```

### 5. Fetch Latest Changes

Before pushing your changes, fetch the latest changes from the upstream repository:
Resolve any merge conflicts if necessary. If any errors `Repeat steps 3 to 7`
```bash
git fetch origin; git pull origin main; npm i
```
### 6. Run build command

Check if your build and test is compiling without errors: If any errors `Repeat steps 3 to 7`

```bash
npm run build && npm run test;
```

### 7. Push Changes

Push your local changes to your forked repository:

```bash
git push origin <branch>
```

### 8. Create Pull Request [Optionally if you have a PR already]

Finally, navigate to your forked repository on GitHub and create a pull request (PR) from your `<branch>` to the original repository's main branch.

### 9. Repeat Steps 3 to 7 if changes are required during the PR review

#

# Code Style Guidelines

Please adhere to the project's coding conventions and style guide when making changes. Ensure your code is well-documented and tested if applicable.

#

# Conventions

### Pull Request (**PR**) Conventions
#### Rules

1. Request an Engineer/s to review your PR (to check if your code makes sense to merge to the `main` branch).
2. Assign yourself (for anyone to quickly identify you as the owner of the PR).
3. Don't Merge without approval from your Code reviewer/s!!! (This could deal some potential damage if you do this 🥴)
4. Merge after approval. 🚢

#### Format

- The **PR** title. eg. `[#675] Add prettier configuration`.
- The **PR** body: This should be the link to the ticket on Trello. eg. `Trello: https://trello.com/c/XEv0yeTA`.

#

### Branch / Commits Conventions (Add the `ft` or `rf` or `bg` to the ticket slug in the Trello board)
#### Branch

- Format `<rf|ft|bg>-#ticket-id-<ticket-title>`
- Example `ft-#675-add-button-component`

#### Commit

- Format `<rf|ft|bg>-#ticket-id: <short description>`
- Example `bg-#675: fix all failing links`


#### How to get #ticket-id
- Go to the [Trello Board](https://trello.com/b/zenzRPKU/ngplatform)
- Click the ticket you're working on
- Check the link for the ID (it's the number in front of the title slug of the link)
- _In this case of the screenshot the ID is 3_
<img width="479" alt="image" src="https://res.cloudinary.com/dmpposta9/image/upload/v1773253960/github/327772239-a5e7b03b-e791-4272-99f1-2363160c64e0_cniymo.png">


