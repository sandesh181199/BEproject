-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 12, 2020 at 11:55 AM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.1.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `alumni`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth`
--

CREATE TABLE `auth` (
  `user_id` varchar(63) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `user_username` varchar(63) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `user_password` varchar(3000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `auth`
--

INSERT INTO `auth` (`user_id`, `user_username`, `user_password`) VALUES
('2kkl0f7xck5aprzsq', 'nikhilkhartode', '$2a$08$4E/SCpPGnUOfqjfjvqHjVuMwn4Nq8a1.KdqZ6jESA5zhYtoSi6jyq'),
('4wpazefwk59ocabn', 'aayushgattawar', '$2a$08$sHGKsJTSK3VNaGGkPMGir.a.eAnqqakxyxPm7Iy6zLBxriQ7dDP0W'),
('xab94cok59mlov6', 'sandeshvanwadi', '$2a$08$JRMKK7dkPYHEMdCk8RwegeRkC/IRhqSNViJFQE.qe5dHAPi.w.vcG');

-- --------------------------------------------------------

--
-- Table structure for table `college_details`
--

CREATE TABLE `college_details` (
  `college_id` int(11) NOT NULL,
  `college_name` varchar(127) NOT NULL,
  `college_address` varchar(255) NOT NULL,
  `college_pincode` int(11) NOT NULL,
  `college_type` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `college_details`
--

INSERT INTO `college_details` (`college_id`, `college_name`, `college_address`, `college_pincode`, `college_type`) VALUES
(12345, 'PCCOE', 'Akurdi ', 412101, b'0');

-- --------------------------------------------------------

--
-- Table structure for table `college_emp`
--

CREATE TABLE `college_emp` (
  `user_id` varchar(63) COLLATE utf8_unicode_ci NOT NULL,
  `college_id` varchar(63) COLLATE utf8_unicode_ci NOT NULL,
  `fname` varchar(31) COLLATE utf8_unicode_ci NOT NULL,
  `lname` varchar(31) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `college_emp`
--

INSERT INTO `college_emp` (`user_id`, `college_id`, `fname`, `lname`) VALUES
('xab94cok59mlov6', '12345', 'Sandesh', 'Vanwadi');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `event_id` varchar(63) COLLATE utf8_unicode_ci NOT NULL,
  `college_id` varchar(63) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(63) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(4095) COLLATE utf8_unicode_ci NOT NULL,
  `event_date` datetime NOT NULL,
  `batch` varchar(31) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`event_id`, `college_id`, `name`, `description`, `event_date`, `batch`) VALUES
('xab938wk59lt6kx', '12345', 'Interview of TE students', 'To take interview', '2020-01-20 13:00:00', '2017-2021');

-- --------------------------------------------------------

--
-- Table structure for table `modules`
--

CREATE TABLE `modules` (
  `module_id` int(11) NOT NULL,
  `module_name` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `otp`
--

CREATE TABLE `otp` (
  `userid` varchar(63) COLLATE utf8_unicode_ci NOT NULL,
  `otp_value` int(11) NOT NULL,
  `otp_ts` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `otp`
--

INSERT INTO `otp` (`userid`, `otp_value`, `otp_ts`) VALUES
('1', 27212, '2020-01-10 22:17:20');

-- --------------------------------------------------------

--
-- Table structure for table `personal_details`
--

CREATE TABLE `personal_details` (
  `user_id` varchar(63) NOT NULL,
  `first_name` varchar(31) NOT NULL,
  `last_name` varchar(31) NOT NULL,
  `college_id` int(11) NOT NULL,
  `phone_number` text NOT NULL,
  `email_address` varchar(63) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `personal_details`
--

INSERT INTO `personal_details` (`user_id`, `first_name`, `last_name`, `college_id`, `phone_number`, `email_address`) VALUES
('123456', 'Jayesh', 'pawar', 12345, '1234567890', 'jayesh@gmail.com'),
('4wpazefwk59ocabn', 'Aayush', 'Gattawar', 12345, '9527315508', 'ayush@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_route` varchar(63) NOT NULL,
  `module_id` int(11) NOT NULL,
  `description` varchar(31) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `student_college_info`
--

CREATE TABLE `student_college_info` (
  `college_id` varchar(63) COLLATE utf8_unicode_ci NOT NULL,
  `college_name` varchar(63) COLLATE utf8_unicode_ci NOT NULL,
  `student_fname` varchar(31) COLLATE utf8_unicode_ci NOT NULL,
  `student_lname` varchar(31) COLLATE utf8_unicode_ci NOT NULL,
  `student_email` varchar(31) COLLATE utf8_unicode_ci NOT NULL,
  `student_number` text COLLATE utf8_unicode_ci NOT NULL,
  `student_registered` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `student_college_info`
--

INSERT INTO `student_college_info` (`college_id`, `college_name`, `student_fname`, `student_lname`, `student_email`, `student_number`, `student_registered`) VALUES
('12345', 'PCCoE', 'Aayush', 'Gattawar', 'ayush@gmail.com', '9527315508', b'0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth`
--
ALTER TABLE `auth`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_username` (`user_username`);

--
-- Indexes for table `college_details`
--
ALTER TABLE `college_details`
  ADD PRIMARY KEY (`college_id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`event_id`),
  ADD UNIQUE KEY `event_id` (`event_id`);

--
-- Indexes for table `modules`
--
ALTER TABLE `modules`
  ADD PRIMARY KEY (`module_id`);

--
-- Indexes for table `otp`
--
ALTER TABLE `otp`
  ADD PRIMARY KEY (`userid`);

--
-- Indexes for table `personal_details`
--
ALTER TABLE `personal_details`
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `college_details`
--
ALTER TABLE `college_details`
  MODIFY `college_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12346;

--
-- AUTO_INCREMENT for table `modules`
--
ALTER TABLE `modules`
  MODIFY `module_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
