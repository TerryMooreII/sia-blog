---
title: "Mac Setup"
date: 2025-12-18T03:04:18.099Z
tags: [mac, osx]
excerpt: "List of software and configurations changes for my new MacBook Pro"
draft: false
---

## New MacBook Pro M4

![MacBook Pro M4](https://cdn.wccftech.com/wp-content/uploads/2025/02/M4-Pro-14-inch-MacBook-Pro-1.jpg)

It’s been almost a decade since I last bought a laptop. My previous machine—a 2015 MacBook Pro—served me well, and I loved using it until I switched to an M2 MacBook for work. Eventually, the old Mac stopped getting updates, so I tried running Linux on it, but the battery life was awful and the unfamiliar key mappings drove me crazy. At that point, I knew it was finally time for an upgrade.

Each time I get a new machine or re-install the OS I forget the different tweaks and software that I install on it. So I figure it's time to document it.

### Homebrew

First thing first, install [homebrew](https://brew.sh/) deemed the missing Mac package manager


List of apps

```shell
brew install ghostty
brew install firefox
brew install 1password
brew install proton-mail
brew install protonvpn
brew install cursor
brew install notion
brew install discord
brew install slack
brew install mise
brew install tor-browser
brew install vlc
brew install spotify
brew install google-chrome
brew install keepingyouawake
```

### zsh

Install [ohmyzsh](https://ohmyz.sh/) for zsh themes and plugins

### OSX Tweaks

```shell
defaults write com.apple.finder AppleShowAllFiles YES
defaults write com.apple.finder ShowPathbar -bool true
defaults write com.apple.finder ShowStatusBar -bool true
defaults write com.apple.dock mru-spaces -bool false # Disables Virtual Desktops auto arranging

killall Finder;
```

### Xcode

Install xcode from the App Store

### Git and Github

```shell
git config --global user.name "Terry Moore II"
git conifg --global user.email terry@mooreii.com
git config --global core.editor nano
git config --global init.defaultBranch main
```


```shell
ssh-keygen -t ed25519 -C "your_email@example.com"
eval "$(ssh-agent -s)"
open ~/.ssh/config
touch ~/.ssh/config
open ~/.ssh/config
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
ssh-keygen -t ed25519-sk -C "terry@mooreii.com"
pbcopy < ~/.ssh/id_ed25519.pub
```

The last command copies the key, now go to github and add it


### Managing Node versions

I used to use [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md) but was recently introduced to [mise](https://mise.jdx.dev/).  The nice thing about `mise` is that it will not only manage node versions but also python and several others.

Installing `mise` for `zsh` integration

```shell
curl https://mise.run/zsh | sh
```

Check back, I plan on keeping this updated with the essential software and configs.