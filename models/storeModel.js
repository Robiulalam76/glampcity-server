const mongoose = require("mongoose");

const storeSchema = mongoose.Schema(
  {
    verified: {
      type: String,
      enum: ['true', 'false'],
      default: false
    },
    logo: {
      type: String,
      default: "https://s3.amazonaws.com/thumbnails.venngage.com/template/fc8535df-be09-4c80-8ea5-a69a34b2318e.png"
    },
    username: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
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
      type: String,
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
    status: {
      type: String,
      default: "Show",
      enum: ["Show", "Hide"],
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
