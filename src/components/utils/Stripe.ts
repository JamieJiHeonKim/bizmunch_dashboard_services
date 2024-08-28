import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "../../middleware/env";

const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15',
    typescript: true,
    });


export default stripe;