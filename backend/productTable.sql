-- 1. Create the database
CREATE DATABASE productdb;

-- 2. Use the database
USE productdb;

-- 3. Create the products table
CREATE TABLE IF NOT EXISTS products (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    image VARCHAR(255)
);

-- 4. Insert professional products
INSERT INTO products (name, description, image) VALUES
('Executive Wireless Headphones', 'Premium over-ear wireless headphones with active noise cancellation, 40-hour battery life, and high-fidelity sound, ideal for professional environments.', 'https://th.bing.com/th/id/OIP.n3Jnwh_G6Zknnm_yHQyRHAHaHa?w=176&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'),
('Smart Productivity Watch', 'Sleek smartwatch with advanced health monitoring, calendar integration, and real-time notifications to optimize daily workflow.', 'https://tse4.mm.bing.net/th/id/OIP.NQb9TlLQTIPug_wfQsV3qwHaHa?w=900&h=900&rs=1&pid=ImgDetMain&o=7&rm=3'),
('Ergonomic Laptop Stand', 'Adjustable aluminum laptop stand designed for optimal posture and desk ergonomics, compatible with all laptop sizes.', 'https://tse2.mm.bing.net/th/id/OIP.zflIPKS5UOk2k5G6PHls_AHaIV?rs=1&pid=ImgDetMain&o=7&rm=3'),
('Multi-Port USB-C Hub', 'Compact USB-C hub with HDMI, USB 3.0, SD card slot, and fast charging support, perfect for modern workstations.', 'https://m.media-amazon.com/images/I/61i6Uicea+L._AC_SL1500_.jpg'),
('Wireless Charging Station', 'Multi-device wireless charging station with fast charging capabilities for smartphones, earbuds, and smartwatches.', 'https://th.bing.com/th/id/OIP.0apEU_LXE2cx9fIys3b9HgHaHa?w=184&h=184&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3');
