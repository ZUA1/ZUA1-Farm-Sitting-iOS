
import stripe from 'tipsi-stripe'

export const createNewStripe = async (user) => {
    try {
        const token = await stripe.paymentRequestWithCardForm({
            // Only iOS support this options
            smsAutofillDisabled: true,
            requiredBillingAddressFields: 'full',
            prefilledInformation: {
                billingAddress: {
                    name: user && user.name,
                    email: user && user.email,
                },
            },
        })
        if (token.tokenId) {
            return Promise.resolve(token)
        } else {
            return Promise.reject('invalid card')
        }
    } catch (error) {
        return Promise.reject(error)
    }
}