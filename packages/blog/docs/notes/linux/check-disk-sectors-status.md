# 检查磁盘扇区状态

- 第一个软驱 `/dev/fd0`.
- 第二个软驱 `/dev/fd1`.
- 第一块硬盘 `/dev/sda`.
- 第二块硬盘 `/dev/sdb`, 以此类推.

## lsblk 命令

```bash
debian@debian:/dev$ sudo lsblk
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda      8:0    0 111.8G  0 disk
├─sda1   8:1    0   512M  0 part /boot/efi
├─sda2   8:2    0 110.3G  0 part /
└─sda3   8:3    0   976M  0 part [SWAP]
debian@debian:/dev$
```

## fdisk 命令

```bash
debian@debian:/dev$ sudo fdisk -l
Disk /dev/sda: 111.79 GiB, 120034123776 bytes, 234441648 sectors
Disk model: KSM120
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: D5F62707-3A4F-4C7E-A75B-BBDEB30B89AB

Device         Start       End   Sectors   Size Type
/dev/sda1       2048   1050623   1048576   512M EFI System
/dev/sda2    1050624 232441855 231391232 110.3G Linux filesystem
/dev/sda3  232441856 234440703   1998848   976M Linux swap
debian@debian:/dev$
```

## df 命令

```bash
debian@debian:/dev$ sudo df -h
Filesystem      Size  Used Avail Use% Mounted on
udev            3.8G     0  3.8G   0% /dev
tmpfs           778M  1.4M  777M   1% /run
/dev/sda2       109G   11G   93G  10% /
tmpfs           3.8G     0  3.8G   0% /dev/shm
tmpfs           5.0M  8.0K  5.0M   1% /run/lock
/dev/sda1       511M  5.9M  506M   2% /boot/efi
tmpfs           778M   28K  778M   1% /run/user/1000
debian@debian:/dev$
```
