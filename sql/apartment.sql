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

 Date: 22/09/2019 00:24:22
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
-- Records of admin
-- ----------------------------
BEGIN;
INSERT INTO `admin` VALUES (1, '张三', 0, 13808080808);
COMMIT;

-- ----------------------------
-- Table structure for dorm
-- ----------------------------
DROP TABLE IF EXISTS `dorm`;
CREATE TABLE `dorm` (
  `id` tinyint(5) NOT NULL AUTO_INCREMENT,
  `room` int(3) NOT NULL,
  `type` tinyint(1) DEFAULT NULL COMMENT '0为本科生 1为研究生',
  `admin_id` tinyint(5) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_id` (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of dorm
-- ----------------------------
BEGIN;
INSERT INTO `dorm` VALUES (1, 20, 0, 1);
INSERT INTO `dorm` VALUES (2, 12, 1, 1);
INSERT INTO `dorm` VALUES (3, 123, 0, 1);
INSERT INTO `dorm` VALUES (4, 123123, 0, 1);
COMMIT;

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
  KEY `room_id` (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of maintain
-- ----------------------------
BEGIN;
INSERT INTO `maintain` VALUES (1, 1, 1, 0, '厕所堵住了', 0);
COMMIT;

-- ----------------------------
-- Table structure for room
-- ----------------------------
DROP TABLE IF EXISTS `room`;
CREATE TABLE `room` (
  `id` tinyint(5) NOT NULL AUTO_INCREMENT,
  `max` int(2) NOT NULL,
  `dorm_id` tinyint(5) NOT NULL,
  `name` varchar(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `dorm_id` (`dorm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of room
-- ----------------------------
BEGIN;
INSERT INTO `room` VALUES (1, 6, 1, 'S217');
COMMIT;

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
  KEY `room_id` (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2010002 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of student
-- ----------------------------
BEGIN;
INSERT INTO `student` VALUES (2010001, '刘扬帆', 1, 1, 1);
COMMIT;

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
  `id` tinyint(5) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of visitor
-- ----------------------------
BEGIN;
INSERT INTO `visitor` VALUES ('林美美', 1, 510302199302100021, 1, 1, '找朋友', 0, 1);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
