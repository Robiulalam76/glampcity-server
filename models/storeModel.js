const mongoose = require("mongoose");

const storeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    logo: {
      type: String,
      required: true,
      default: "https://w7.pngwing.com/pngs/406/577/png-transparent-grocery-store-convenience-shop-retail-computer-icons-store-food-company-text.png"
    },
    images: {
      type: [String],
      default: ["https://t3.ftcdn.net/jpg/02/62/18/46/360_F_262184611_bXhmboL9oE6k2ILu4qXxNWFhNJCEbTn2.jpg"],
      required: false,
    },
    verified: {
      type: Boolean,
      enum: [true, false],
      default: false
    },
    username: {
      type: String,
      unique: true,
      required: true
    },
    userId: {
      type: String,
      ref: "User",
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
    postalCode: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: "Show",
      enum: ["Show", "Hide"],
    },
    email: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
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


/*


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
*/