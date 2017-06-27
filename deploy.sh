pc_root=/home/work/koa_base/source/apps/pc
pc_code=/home/work/koa-pc/source/

echo "更新代码，y or n？"
read ANS
case $ANS in
y)
	cd $pc_code
	git pull origin master
	echo "get koa-pc master done"

	echo "输入y回车继续，输入n回车结束"
	read ANS
	case $ANS in
	y|Y|yes|Yes)
		;;
	n|N|no|No)
		echo exit
		exit 0
		;;
	esac
	;;
n)
	;;
esac

cp -r $pc_code/* $pc_root

cd $pc_root && npm install