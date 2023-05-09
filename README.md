# [Afif Project Page](https://afifurrohman-id.github.io)

Page for show all project afif

## Requirements:

- Git / Git Bash (For Windows) version >= 2.40.x
- firebase-tools version >= 11.29.x
- Java (For firebase emulators) version >= 20.0.x

## Run Locally

- Clone this project repository

```git clone https://github.com/afifurrohman-id/afifurrohman-id.github.io```

- Go to project directory

```cd afifurrohman-id.github.io/```

### Firebase Configuration for Development
- Create file firebase project 

```touch .firebaserc```

- Add your project to ```.firebaserc```
```
 {
  "projects": {
    "default": "<your-project-id>"
  }
}
```

- Run firebase emulator suite server 



```firebase emulators:start```

