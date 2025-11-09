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

-- Insert all 14 halls organized by complex
INSERT INTO halls (name, building, washer_count, dryer_count) VALUES
  -- Parker Complex
  ('Bliss Hall', 'Parker Complex', 5, 4),
  ('Bouton Hall', 'Parker Complex', 6, 6),
  ('Capen Hall', 'Parker Complex', 5, 4),
  ('Gage Hall', 'Parker Complex', 5, 4),
  ('Scudder Hall', 'Parker Complex', 5, 4),
  ('Shango/College Hall', 'Parker Complex', 5, 4),
  -- Peregrine Complex
  ('Ashokan Hall', 'Peregrine Complex', 4, 3),
  ('Awosting Hall', 'Peregrine Complex', 4, 3),
  ('Minnewaska Hall', 'Peregrine Complex', 4, 3),
  ('Mohonk Hall', 'Peregrine Complex', 4, 3),
  ('Shawangunk Hall', 'Peregrine Complex', 4, 3),
  -- South Complex
  ('Esopus Hall', 'South Complex', 5, 4),
  ('Lenape Hall', 'South Complex', 6, 4),
  ('Ridgeview Hall', 'South Complex', 9, 3)
ON CONFLICT (name) DO NOTHING;

-- Generate machines for all halls automatically
INSERT INTO machines (hall_id, type, machine_number, status) 
SELECT 
  h.id,
  'washer',
  generate_series(1, h.washer_count),
  'available'
FROM halls h
ON CONFLICT (hall_id, type, machine_number) DO NOTHING;

INSERT INTO machines (hall_id, type, machine_number, status) 
SELECT 
  h.id,
  'dryer',
  generate_series(1, h.dryer_count),
  'available'
FROM halls h
ON CONFLICT (hall_id, type, machine_number) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_machines_hall_id ON machines(hall_id);
CREATE INDEX IF NOT EXISTS idx_machines_status ON machines(status);
CREATE INDEX IF NOT EXISTS idx_machines_type ON machines(type);

-- Create a function to automatically update last_updated timestamp
CREATE OR REPLACE FUNCTION update_last_updated_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_updated = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update last_updated
DROP TRIGGER IF EXISTS update_machines_last_updated ON machines;
CREATE TRIGGER update_machines_last_updated
BEFORE UPDATE ON machines
FOR EACH ROW
EXECUTE FUNCTION update_last_updated_column();