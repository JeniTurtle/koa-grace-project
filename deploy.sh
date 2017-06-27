case $1 in
pc)
    pc_root=/home/work/koa_base/source/apps/pc
    pc_code=/home/work/koa-pc/source

    cp -r $pc_code/* $pc_root

    cd $pc_root && npm install

	;;
mobile)

	;;
esac

