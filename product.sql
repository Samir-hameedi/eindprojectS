-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 21 jun 2026 om 20:35
-- Serverversie: 10.4.32-MariaDB
-- PHP-versie: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `samirdatawebshop`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `product`
--

CREATE TABLE `product` (
  `productid` int(10) NOT NULL,
  `namee` varchar(100) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `imgURL` text CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `model` varchar(200) DEFAULT NULL,
  `info` varchar(200) DEFAULT NULL,
  `features` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `product`
--

INSERT INTO `product` (`productid`, `namee`, `price`, `imgURL`, `model`, `info`, `features`) VALUES
(419, 'Samsung Galaxy S24 Ultra', 1299.99, 'https://png.pngtree.com/recommend-works/png-clipart/20250121/ourmid/pngtree-samsung-galaxy-s24-ultra-png-image_15287053.png', 'S24-Ultra', 'Flagship Samsung smartphone with powerful camera system and premium design.', 'Features a 6.8-inch Dynamic AMOLED display with high refresh rate, Snapdragon flagship processor, advanced AI capabilities, 200MP professional-grade camera system, long battery life, fast charging sup'),
(420, 'iPhone 15 Pro Max', 1399.99, 'https://www.dxomark.com/wp-content/uploads/medias/post-155689/Apple-iPhone-15-Pro-Max_-blue-titanium_featured-image-packshot-review.jpg', 'IP15PM', 'Premium Apple smartphone built with titanium and advanced performance.', 'Comes with a Super Retina XDR display, powerful A-series processor, titanium body construction, professional camera setup, cinematic video recording, advanced image processing, strong security ecosyst'),
(421, 'Xiaomi 14 Ultra', 999.99, 'https://www.dxomark.com/wp-content/uploads/medias/post-171171/bdc0df40e7c3983b73802b3d47dd20c4600x60085.jpg', 'XM14U', 'High-end Android smartphone focused on photography and performance.', 'Includes a bright AMOLED display, flagship Snapdragon chipset, Leica-enhanced camera technology, professional photography controls, fast wired and wireless charging, durable construction, smooth gamin'),
(422, 'Google Pixel 9 Pro', 1099.99, 'https://www.dxomark.com/wp-content/uploads/medias/post-176677/Google-Pixel-9-Pro-XL_featured-image-packshot-review.png', 'PX9PRO', 'Google flagship phone with clean Android experience and AI tools.', 'Offers exceptional computational photography, AI-powered productivity tools, vibrant OLED display, powerful performance, advanced security features, long battery endurance, intelligent voice assistanc'),
(423, 'OnePlus 12', 899.99, 'https://image01.oneplus.net/media/202405/28/b96848b7acd10dafde32203d12f6fea7.png', 'OP12', 'Performance-focused smartphone with fast charging technology.', 'Provides flagship-level processor performance, fluid AMOLED display with high refresh rate, rapid charging system, large battery capacity, premium camera hardware, optimized OxygenOS experience, stron'),
(424, 'Dell UltraSharp U2723QE', 649.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnWfr8GEhC_cBPEOlJa1BLbaAu0ixkUg1yMO9U0JRrUw&s=10', 'U2723QE', 'Professional 4K monitor designed for productivity and color accuracy.', 'Features a 27-inch 4K IPS panel, excellent color reproduction, USB-C connectivity, ergonomic stand adjustments, wide viewing angles, professional design workflow support, multiple connectivity ports, '),
(425, 'LG UltraGear 27GR95QE', 899.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTesxfLcB3Xokb2FiDauVqikDpKLYGBJalXLInGelcAY8PqWfvbtOAzQOnw&s=10', '27GR95QE', 'High-end OLED gaming monitor with exceptional response time.', 'Includes OLED technology for deep contrast, ultra-fast refresh rate, minimal response time, immersive gaming visuals, HDR support, adaptive synchronization technology, premium build quality, gaming-or'),
(426, 'Samsung Odyssey G8', 799.99, 'https://i.extremetech.com/imagery/content-types/00JGd0oQR3Mp4OzhTYr9WRs/hero-image.fit_lim.v1744166311.jpg', 'ODG8', 'Curved gaming monitor designed for immersive gameplay.', 'Provides a high-refresh curved display, premium gaming features, adaptive sync support, strong brightness levels, detailed image quality, low latency performance, ergonomic design, immersive viewing e'),
(427, 'ASUS ProArt PA278QV', 399.99, 'https://images.expertreviews.co.uk/wp-content/uploads/2022/01/asus_proart_display_pa278qv_review_-_lead_image.jpg', 'PA278QV', 'Professional monitor for designers and content creators.', 'Offers factory-calibrated color accuracy, IPS technology, wide color gamut coverage, ergonomic stand adjustments, excellent image consistency, creative workflow optimization, multiple connection inter'),
(428, 'BenQ EX3501R', 549.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNpEK_ZOM0uMsDmSkSi-TRn4i84dB5JG9bUfKMoEdPnehFIYjDiY0aUyUD&s=10', 'EX3501R', 'Ultra-wide curved monitor for productivity and entertainment.', 'Features a large ultra-wide display format, immersive curved design, HDR support, productivity-focused workspace management, multimedia optimization, strong image quality, multiple connectivity ports,'),
(429, 'MacBook Pro 16', 2499.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUaWYlpM7VhvwUd6FnvwS-mRMmBCvxiEoIDVUZA48v6g&s=10', 'MBP16', 'Premium Apple laptop for professional workloads.', 'Powered by advanced Apple silicon processors, high-resolution Liquid Retina display, excellent battery life, premium aluminum construction, professional creative software performance, efficient therma'),
(430, 'Dell XPS 15', 1999.99, 'https://static0.xdaimages.com/wordpress/wp-content/uploads/2023/03/dell-xps-15-2023.png?w=1600&h=900&fit=crop', 'XPS15', 'High-end Windows laptop with premium build quality.', 'Includes a vibrant display, powerful processor options, dedicated graphics capabilities, premium construction materials, excellent keyboard and touchpad, professional productivity features, strong bat'),
(431, 'Lenovo ThinkPad X1 Carbon', 1799.99, 'https://images.squarespace-cdn.com/content/v1/5e8d4b39f7e29976a0ed859a/1650515902055-7IJ4A8SRM3DQDDNNXWWY/lenovo-carbon-x1.png?format=1500w', 'X1CARBON', 'Business-focused laptop known for durability and portability.', 'Provides enterprise-grade security, lightweight carbon fiber construction, exceptional keyboard comfort, reliable performance, long battery life, productivity-oriented features, strong connectivity op'),
(432, 'ASUS ROG Strix G18', 2299.99, 'https://dlcdnwebimgs.asus.com/files/media/b54349dd-1e57-46b1-b1a7-10166bf72325/v1/img/performance/engine-pd.png', 'ROGG18', 'Gaming laptop built for high-performance gaming sessions.', 'Features a high-refresh display, powerful gaming processor, dedicated graphics hardware, advanced cooling technology, RGB customization options, premium keyboard design, strong gaming optimization, im'),
(433, 'HP Spectre x360', 1599.99, 'https://www.pngkey.com/png/full/351-3516897_hp-spectre-x360-stand-mode-hp-spectre-x360.png', 'SPX360', 'Convertible premium laptop with touchscreen functionality.', 'Combines a flexible 2-in-1 design, touchscreen display, premium materials, long-lasting battery performance, productivity-focused software experience, efficient processor architecture, excellent porta');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`productid`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `product`
--
ALTER TABLE `product`
  MODIFY `productid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=434;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
