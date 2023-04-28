const mongoose = require("mongoose");

const storeSchema = mongoose.Schema(
  {
    verified: {
      type: String,
      enum: ['true', 'false'],
      default: false
    },
    username: {
      type: String,
      required: true
    },
    userID: {
      type: String,
      required: false
    },

    business_type: {
      type: [String],
      required: true
    },
    company_name: {
      type: String,
      required: true
    },
    location_of_registration: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    postal_code: {
      type: String,
      required: true
    },
    main_product: {
      type: [String],
      required: true
    },
    company_registered: {
      type: String,
      required: true
    },
    legal_owner: {
      type: String,
      required: true
    },
    factory_name: {
      type: String,
      required: true
    },
    cooperation_contacts: {
      type: String,
      required: false
    },
    years_of_cooperation: {
      type: String,
      required: false
    },
    total_transaction: {
      type: String,
      required: false
    },
    company_logo: {
      type: String,
      required: false
    },
    detailed_company: {
      type: String,
      required: false
    },
    company_photos: {
      type: [String],
      required: false
    },
    ctrade_show_name: {
      type: String,
      required: true
    },
    date_attended: {
      type: [String],
      required: true
    },
    host_country: {
      type: String,
      required: true
    },
    trade_show_instruction: {
      type: String,
      required: false
    },
    trade_show_photos: {
      type: [String],
      required: false
    },
    crateAt: {
      type: Date,
      default: Date.now()
    }

  },
  {
    timestamps: true,
  }
);

const Store = mongoose.model("Store", storeSchema);
module.exports = Store;
