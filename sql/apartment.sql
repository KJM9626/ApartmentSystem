/*
 Navicat Premium Data Transfer

 Source Server         : cloud
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : localhost:3306
 Source Schema         : apartment

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 23/09/2019 11:26:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` tinyint(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `gender` tinyint(1) NOT NULL,
  `tel` bigint(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for dorm
-- ----------------------------
DROP TABLE IF EXISTS `dorm`;
CREATE TABLE `dorm` (
  `id` tinyint(5) NOT NULL AUTO_INCREMENT,
  `room` int(3) NOT NULL,
  `type` tinyint(1) DEFAULT NULL COMMENT '0为本科生 1为研究生',
  `admin_id` tinyint(5) NOT NULL,
  `student_num` int(5) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `admin_id` (`admin_id`),
  CONSTRAINT `dorm_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for maintain
-- ----------------------------
DROP TABLE IF EXISTS `maintain`;
CREATE TABLE `maintain` (
  `id` tinyint(5) NOT NULL AUTO_INCREMENT,
  `dorm_id` tinyint(5) NOT NULL,
  `room_id` tinyint(5) NOT NULL,
  `type` tinyint(1) NOT NULL,
  `detail` varchar(100) NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `dorm_id` (`dorm_id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `maintain_ibfk_1` FOREIGN KEY (`dorm_id`) REFERENCES `dorm` (`id`),
  CONSTRAINT `maintain_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for room
-- ----------------------------
DROP TABLE IF EXISTS `room`;
CREATE TABLE `room` (
  `id` tinyint(5) NOT NULL AUTO_INCREMENT,
  `max` int(2) NOT NULL,
  `dorm_id` tinyint(5) NOT NULL,
  `name` varchar(4) NOT NULL,
  `student_num` int(5) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `dorm_id` (`dorm_id`),
  CONSTRAINT `room_ibfk_1` FOREIGN KEY (`dorm_id`) REFERENCES `dorm` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `gender` tinyint(1) NOT NULL,
  `dorm_id` tinyint(5) NOT NULL,
  `room_id` tinyint(5) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `dorm_id` (`dorm_id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`dorm_id`) REFERENCES `dorm` (`id`),
  CONSTRAINT `student_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for visitor
-- ----------------------------
DROP TABLE IF EXISTS `visitor`;
CREATE TABLE `visitor` (
  `name` varchar(20) NOT NULL,
  `gender` tinyint(1) NOT NULL,
  `idno` bigint(18) NOT NULL,
  `dorm_id` tinyint(5) NOT NULL,
  `room_id` tinyint(5) NOT NULL,
  `reason` varchar(100) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `id` tinyint(5) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `dorm_id` (`dorm_id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `visitor_ibfk_1` FOREIGN KEY (`dorm_id`) REFERENCES `dorm` (`id`),
  CONSTRAINT `visitor_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Triggers structure for table student
-- ----------------------------
DROP TRIGGER IF EXISTS `student_add`;
delimiter ;;
CREATE TRIGGER `student_add` AFTER INSERT ON `student` FOR EACH ROW BEGIN
UPDATE dorm set dorm.student_num = dorm.student_num + 1 where dorm.id = new.dorm_id;
UPDATE room set room.student_num = room.student_num + 1 where room.id = new.room_id;
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table student
-- ----------------------------
DROP TRIGGER IF EXISTS `student_delete`;
delimiter ;;
CREATE TRIGGER `student_delete` AFTER DELETE ON `student` FOR EACH ROW BEGIN
UPDATE dorm set dorm.student_num = dorm.student_num - 1 where dorm.id = old.dorm_id;
UPDATE room set room.student_num = room.student_num - 1 where room.id = old.room_id;
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
