import mongoose from 'mongoose'

export interface GlossaryData extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId
  title: string
  innerHTML: string
}

const GlossaryDataSchema = new mongoose.Schema<GlossaryData>({
    _id: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        },
    title: {
        type: String,
        required: true,
        },
    innerHTML: {
        type: String,
        required: true,
  },
}, { collection: 'data' })

export default mongoose.models.GlossaryData || mongoose.model<GlossaryData>('GlossaryData', GlossaryDataSchema)