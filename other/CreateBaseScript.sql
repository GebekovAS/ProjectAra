# --------------------------------------------------------
# Host:                         127.0.0.1
# Server version:               5.6.10
# Server OS:                    Win64
# HeidiSQL version:             6.0.0.3603
# Date/time:                    2015-02-05 20:57:32
# --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

# Dumping database structure for cpu_list
CREATE DATABASE IF NOT EXISTS `cpu_list` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `cpu_list`;


# Dumping structure for table cpu_list.cpu_table
CREATE TABLE IF NOT EXISTS `cpu_table` (
  `host` varchar(50) DEFAULT NULL,
  `host_name` varchar(50) DEFAULT NULL,
  `mem_used` int(11) DEFAULT NULL,
  `cpu_used` int(11) DEFAULT NULL,
  `processes_count` int(11) DEFAULT NULL,
  `disks_state` varchar(255) DEFAULT NULL,
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ping` int(11) DEFAULT '0',
  KEY `Index 1` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# Data exporting was unselected.
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
