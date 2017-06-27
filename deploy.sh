case $1 in
pc)
    pc_root=/home/work/node/servers/koa_base/current/apps/pc
    pc_code=/home/work/node/servers/koa_pc/current

    cp -r $pc_code/* $pc_root

    cd $pc_root && npm install

	;;
mobile)

	;;
esac

