# 检查磁盘扇区状态

## lsblk

```bash
debian@debian:/dev$ lsblk
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda      8:0    0 111.8G  0 disk
├─sda1   8:1    0   512M  0 part /boot/efi
├─sda2   8:2    0 110.3G  0 part /
└─sda3   8:3    0   976M  0 part [SWAP]
debian@debian:/dev$
```

## fdisk

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
