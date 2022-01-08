# Obsidian GitBook
Deploy an Obsidian vault on GitBook.

This is a repository that turns an Obsidian project into a GitBook project, that can be linked with GitHub, so it will be automatically deployed. Just link your GitBook project with your fork of this repo, and run the deploy flow.

## Manual Deployment
You can make the deploy by your own, moving the stuff manually, and making your commits.

Just copy your obsidian project to a directory (in the repo root) called `obsidian`. Commit and push. Every time that new code goes to GitHub, there's an action that automatically build the `obsidian` folder into a GitBook project under the `gitbook` folder.

Every time you want to update the code, copy and paste your obsidian vault into the `obsidian` folder, commit and push. Remember to pull before doing so.

## Automatic deployment
If you don't want to be manually updating your GitBook deployment, you can follow this short guide.

1. Create a repository for yor Obsidian vault, and push the changes there. You can check [recursos-diseno-es](https://github.com/recursosdisenoes/recursos-diseno-es) as an example (check out the `.gitignore`, it might be useful for your vault)
2. Add a secret to your fork of this repo (Settings > Secrets) called `OBSIDIAN_REPO` with the value `username/repo-name`. In the case of the repo shown in step 1, it would be `recursosdisenoes/recursos-diseno-es`.
3. Run the GitBook Deploy action every single time you want that repo to be updated.

ToDo: Run the deploy auto on vault repo change.



