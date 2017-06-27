case $1 in
pc)
    pc_root=/home/work/node/servers/koa_base/source/apps/pc
    pc_code=/home/work/node/servers/koa_pc/source

    cp -r $pc_code/* $pc_root

    cd $pc_root && npm install

	;;
mobile)

	;;
esac

