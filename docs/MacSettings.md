＃ 新 Mac 电脑 设置


1 设置触控板三指移动, 双指滚动方向
2 设置 Dock 缩放,隐藏
3 设置 Mission Dashboard 作为 Space, 去掉自动根据使用情况调整桌面位置。
4 设置输入切换快捷键为Command+Space
5 Apple Store 更新系统 并下载 evernote 和 The Unarchiver 解压软件。 安装Xcode
6 Finder 设置 并显示隐藏文件
在 macOS Sierra，我们可以使用快捷键⌘⇧.(Command + Shift + .) 来快速（在 Finder 中）显示和隐藏隐藏文件了。

defaults write com.apple.finder AppleShowAllFiles -boolean true ; killall Finder

//OS X Mountain Lion 和早期版本命令如下：
defaults write com.apple.finder AppleShowAllFiles TRUE ; killall Finder

Finder 显示路径和复制路径
设置
defaults write com.apple.finder _FXShowPosixPathInTitle -bool TRUE;killall Finder

还原
defaults delete com.apple.finder _FXShowPosixPathInTitle;killall Finder

如何复制finder当前完整路径：
command+option+c


7 允许从任何地方安装 app 
sudo spctl --master-disable
sudo spctl --master-enable


10  下载 shadowsock Mac 客户端
https://github.com/RobertYan/ShadowsocksX
https://github.com/ethan0w/shadowsocks-iOS
https://github.com/shadowsocks/ShadowsocksX-NG

11 安装 home-brew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)”

==> This script will install:
/usr/local/bin/brew
/usr/local/share/doc/homebrew
/usr/local/share/man/man1/brew.1
/usr/local/share/zsh/site-functions/_brew
/usr/local/etc/bash_completion.d/brew
/usr/local/Homebrew

==> The following new directories will be created:
/usr/local/Cellar
/usr/local/Homebrew
/usr/local/Frameworks
/usr/local/bin
/usr/local/etc
/usr/local/include
/usr/local/lib
/usr/local/opt
/usr/local/sbin
/usr/local/share
/usr/local/share/zsh
/usr/local/share/zsh/site-functions
/usr/local/var


Tapped 3808 formulae (3,964 files, 9.8M)
==> Cleaning up /Library/Caches/Homebrew...
==> Migrating /Library/Caches/Homebrew to /Users/jin/Library/Caches/Homebrew...
==> Deleting /Library/Caches/Homebrew...
Already up-to-date.
==> Installation successful!

==> Homebrew has enabled anonymous aggregate user behaviour analytics.
Read the analytics documentation (and how to opt-out) here:
https://git.io/brew-analytics

==> Next steps:
- Run `brew help` to get started
- Further documentation:
https://git.io/brew-docs


查找软件 http://brewformulas.org/
http://braumeister.org/


12  安装 brew cask
brew tap caskroom/cask
寻找 软件 https://caskroom.github.io/search

13 安装 iterm2
brew cask install iterm2
下载主题文件 https://github.com/altercation/solarized
导入主题  iTerm -> preferences -> profiles -> colors -> load presets.

14 安装 Oh My Zsh
https://gist.github.com/kevin-smets/8568070
https://gist.github.com/GinoPane/34b1a3e933b290bfed41822e035cad73

安装 Oh My Zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)”

编辑 ~/.zshrc 文件 并设置  ZSH_THEME=“agnoster"
plugins=(autojump common-aliases zsh-autosuggestions cp git osx history z npm sublime)


15 安装  powerline fonts 字体
https://github.com/powerline/fonts

下载 https://github.com/Lokaltog/powerline-fonts/blob/master/Meslo/Meslo%20LG%20M%20DZ%20Regular%20for%20Powerline.otf

https://github.com/powerline/fonts/blob/master/Meslo%20Dotted/Meslo%20LG%20L%20DZ%20Regular%20for%20Powerline.ttf

点击下载的字体 安装 
Open the downloaded font and press "Install Font".
Set this font in iTerm2 (14px is my personal preference) (iTerm -> Preferences -> Profiles -> Text -> Change Font).

16 安装 Oh My Zsh 主题 powerlevel9k
https://github.com/bhilburn/powerlevel9k

git clone https://github.com/bhilburn/powerlevel9k.git ~/.oh-my-zsh/custom/themes/powerlevel9k

编辑 ~/.zshrc: 文件:
ZSH_THEME="powerlevel9k/powerlevel9k”

17 安装 Oh My Zsh 插件 
https://github.com/zsh-users/zsh-autosuggestions

git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions

编辑 ~/.zshrc: 文件:
plugins=(zsh-autosuggestions)

设置提示颜色 
编辑 ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh: 文件: 
ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE='fg=1’
ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE=‘fg=5'


18 安装 nvm 和 nodejs
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash

安装nvm 完毕后 运行 nvm install node 安装最新版本nodejs 当前是v7.8.0

安装完nodejs后  运行  npm config set registry https://registry.npm.taobao.org  
设置淘宝源 编辑 ~/.npmrc 加入一下内容
registry=https://registry.npm.taobao.org
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
phantomjs_cdnurl=http://npm.taobao.org/mirrors/phantomjs
ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/


19 安装Go环境
brew install go 
安装完毕后 

设置GOROOT 编辑 ~/.zshrc: 文件:
export PATH=$PATH:/usr/local/opt/go/libexec/bin

设置 GOPATH 工作目录
https://golang.org/doc/code.html#GOPATH

# GOPATH is required to use the 'go get' command:
export GOPATH=$HOME/.go:$HOME/Documents/github/chang-admin



export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$HOME/.go/bin:$HOME/phantomjs/bin”

# NPM GLOBAL Modules PATH !
export NODE_PATH=$HOME/.nvm/versions/node/`node -v`/lib/node_modules:`npm root -g`;


# GOROOT-based install location to your PATH:
# export PATH=$PATH:/usr/local/opt/go/libexec/bin

# GOPATH is required to use the `go get` command:
export GOPATH=$HOME/.go:$HOME/Documents/github/chang-admin



20  设置 Github config 和 gitignore_global
git config --global user.name “JinWYP”
git config --global user.email jinwyp@gmail.com

编辑.gitignore_global文件 


安装 brew cask install sourcetree



21 设置 rsa key 和 ssh config

22 安装 软件 shuttle 
brew cask install shuttle
编辑配置文件 ~/.shuttle.json

23 安装 截图软件 kap
brew cask install kap

24 安装 启动管理软件 launchrocket 和 lunchy
brew cask install launchrocket lunchy

25 安装redis 
brew install redis

To have launchd start redis now and restart at login:  brew services start redis
Or, if you don't want/need a background service you can just run:
  redis-server /usr/local/etc/redis.conf
==> Summary
🍺  /usr/local/Cellar/redis/3.2.8: 11 files, 1.7MB


26  安装mongodb
brew install mongodb

To have launchd start mongodb now and restart at login:
  brew services start mongodb
Or, if you don't want/need a background service you can just run:
  mongod --config /usr/local/etc/mongod.conf

27 安装 mysql 5.6
brew install mysql@5.6

==> Pouring mysql@5.6-5.6.34.sierra.bottle.1.tar.gz
==> Using the sandbox
==> /usr/local/Cellar/mysql@5.6/5.6.34/bin/mysql_install_db --verbose --user=jin --basedir=/usr/local/Cellar/mysql@5.6/5.6.34 --datadir=/usr/local/var/mysql --tmpdir=/tm
==> Caveats
A "/etc/my.cnf" from another install may interfere with a Homebrew-built
server starting up correctly.

To connect:
    mysql -uroot

This formula is keg-only, which means it was not symlinked into /usr/local.

This is an alternate version of another formula.

If you need to have this software first in your PATH run:
  echo 'export PATH="/usr/local/opt/mysql@5.6/bin:$PATH"' >> ~/.zshrc

For compilers to find this software you may need to set:
    LDFLAGS:  -L/usr/local/opt/mysql@5.6/lib
    CPPFLAGS: -I/usr/local/opt/mysql@5.6/include


To have launchd start mysql@5.6 now and restart at login:
  brew services start mysql@5.6
Or, if you don't want/need a background service you can just run:
  /usr/local/opt/mysql@5.6/bin/mysql.server start
==> Summary
🍺  /usr/local/Cellar/mysql@5.6/5.6.34: 344 files, 154.6M

27 安装nginx
brew install nginx
https://www.dionysopoulos.me/248-set-up-nginx-and-php-for-development-on-mac-os-x.html


50 通过brew 安装命令行工具
brew install autojump
brew install iproute2mac
brew install tree
brew install wget
brew install go
brew install mongodb
brew install redis
brew install mysql@5.6
brew install nginx
brew install scala
brew install sbt
brew install maven
brew install gradle 
brew install docker
brew install ffmpeg

sudo npm install -g tldr
tldr --update


51  通过brew cask 安装需要的软件 
参考 https://gist.github.com/t-io/8255711


brew cask install iterm2
brew cask install google-chrome
brew cask install atom
brew cask install sublime-text
brew cask install sourcetree
brew cask install transmit
brew cask install charles
brew cask install shuttle
brew cask install keycastr
brew cask install kap
brew cask install recordist
brew cask install licecap
brew cask install anybar
brew cask install launchrocket
brew cask install lunchy
brew cask install java
brew cask install robomongo
brew cask install sequel-pro
brew cask install medis
brew cask install virtualbox
brew cask install kitematic
brew cask install aliwangwang







