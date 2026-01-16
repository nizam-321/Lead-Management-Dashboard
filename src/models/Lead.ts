import mongoose, { Schema, model, models } from 'mongoose';

const LeadSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: String,
  phone: String,
  stage: { 
    type: String, 
    enum: ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'],
    default: 'New'
  },
  source: { 
    type: String, 
    enum: ['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email Campaign', 'Event'],
    default: 'Website'
  },
  value: { type: Number, default: 0 },
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

LeadSchema.index({ name: 'text', email: 'text', company: 'text' });

export const Lead = models.Lead || model('Lead', LeadSchema);