import { LightningElement, api, track, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import getSimilarProperties from "@salesforce/apex/SimilarPropertyController.getSimilarProperties";
import { registerListener, unregisterAllListeners } from "c/pubsub";
import { CurrentPageReference } from "lightning/navigation";
import { refreshApex } from "@salesforce/apex";

const fields = [
  "Property__c.Name",
  "Property__c.Price__c",
  "Property__c.Status__c",
  "Property__c.Beds__c",
  "Property__c.Broker__c"
];

export default class SimilarProperties extends LightningElement {
  @api recordId;
  @track props;
  @track errorMsg;

  @track property;
  @track price;
  @track beds;

  @api searchCriteria = "Price";
  @api priceRange = "100000";
  @track cardTitle;
  @track noData;

  @wire(getSimilarProperties, {
    recordId: "$recordId",
    priceRange: "$priceRange",
    price: "$price",
    searchCriteria: "$searchCriteria",
    beds: "$beds"
  })
  wiredProps(value) {
    this.wiredRecords = value; // defined to later force update the apex
    if (value.error) {
      this.errorMsg = value.error;
      console.log("ERROR: ", this.errorMsg);
    } else if (value.data) {
      this.props = value.data;
      if (this.props && this.props.length == 0) {
        this.noData = true;
      } else {
        this.noData = false;
      }
    }
  }

  @wire(getRecord, { recordId: "$recordId", fields })
  wiredProperty(value) {
    if (value.data) {
      this.property = value.data;
      this.price = this.property.fields.Price__c.value;
      this.beds = this.property.fields.Beds__c.value;
    } else if (value.error) {
      console.log("OOOPS: ", value.error);
    }
  }

  @wire(CurrentPageReference) pageRef;

  // standard to web components (before mount)
  connectedCallback() {
    registerListener("propertyUpdated", this.refreshSelection, this);
  }

  //
  disconnectedCallback() {
    unregisterAllListeners(this);
  }
  refreshSelection() {
    refreshApex(this.wiredRecords);
  }

  // standard to web components (used to manipulate the DOM)
  renderedCallback() {
    this.cardTitle = "Similar Properties by " + this.searchCriteria;
  }
}
