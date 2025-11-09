-- Database Schema for Laundry Tracking System

-- Create halls table
CREATE TABLE IF NOT EXISTS halls (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  building VARCHAR(100) NOT NULL,
  washer_count INTEGER DEFAULT 0,
  dryer_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create machines table
CREATE TABLE IF NOT EXISTS machines (
  id SERIAL PRIMARY KEY,
  hall_id INTEGER REFERENCES halls(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL CHECK (type IN ('washer', 'dryer')),
  machine_number INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'in_use', 'out_of_order')),
  time_remaining INTEGER DEFAULT 0, -- in minutes
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(hall_id, type, machine_number)
);

-- Insert sample data for the halls 
INSERT INTO halls (name, building, washer_count, dryer_count) VALUES
  ('Awosting Hall', 'Awosting', 4, 3),
  ('Bouton Hall', 'Bouton', 6, 4),
  ('Esopus Hall', 'Esopus', 5, 3),
  ('Ridgeview Hall', 'Ridgeview', 8, 6)
ON CONFLICT (name) DO NOTHING;

-- -- Add sample machines for hall
INSERT INTO machines (hall_id, type, machine_number, status) 
SELECT 
  h.id,
  'washer',
  generate_series(1, 4),
  'available'
FROM halls h 
WHERE h.name = 'Awosting Hall'
ON CONFLICT (hall_id, type, machine_number) DO NOTHING;

INSERT INTO machines (hall_id, type, machine_number, status) 
SELECT 
  h.id,
  'dryer',
  generate_series(1, 3),
  'available'
FROM halls h 
WHERE h.name = 'Awosting Hall'
ON CONFLICT (hall_id, type, machine_number) DO NOTHING;

-- Add similar machines for other halls
INSERT INTO machines (hall_id, type, machine_number, status) 
SELECT 
  h.id,
  'washer',
  generate_series(1, h.washer_count),
  'available'
FROM halls h 
WHERE h.name != 'Awosting Hall'
ON CONFLICT (hall_id, type, machine_number) DO NOTHING;

INSERT INTO machines (hall_id, type, machine_number, status) 
SELECT 
  h.id,
  'dryer',
  generate_series(1, h.dryer_count),
  'available'
FROM halls h 
WHERE h.name != 'Awosting Hall'
ON CONFLICT (hall_id, type, machine_number) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_machines_hall_id ON machines(hall_id);
CREATE INDEX IF NOT EXISTS idx_machines_status ON machines(status);
CREATE INDEX IF NOT EXISTS idx_machines_type ON machines(type);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);

-- Create a function to automatically update last_updated timestamp
CREATE OR REPLACE FUNCTION update_last_updated_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_updated = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update last_updated
CREATE TRIGGER update_machines_last_updated 
    BEFORE UPDATE ON machines 
    FOR EACH ROW 
    EXECUTE FUNCTION update_last_updated_column();