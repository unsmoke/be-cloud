import * as tf from '@tensorflow/tfjs-node'
import dotenv from 'dotenv'

dotenv.config()

let model

export const loadModel = async () => {
    try {
        model = await tf.loadLayersModel(process.env.MODEL_URL)
        console.log('Model loaded successfully')
    } catch (error) {
        console.error('Error loading model:', error)
        throw new Error('Failed to load model')
    }
}

export const predict = async (inputData) => {
    if (!model) {
        throw new Error('Model is not loaded')
    }

    try {
        const inputTensor = tf.tensor2d([inputData])
        const prediction = model.predict(inputTensor)
        return prediction.dataSync()
    } catch (error) {
        console.error('Error during prediction:', error)
        throw new Error('Prediction error')
    }
}
