export const Category = {
    name: "Category",
    primaryKey: "id",
    properties: {
        id: "int",
        name: "string?"
    }
};

export const Asset = {
    name: "Asset",
    primaryKey: "id",
    properties: {
        source: "string",
        type: "string",
        id: "string"
    }
};


export const Venue = {
    name: "Venue",
    primaryKey: "id",
    properties: {
        id: "int",
        name: "string",
        address: "string?",
        phone: "string?",
        latitude: "double?",
        longitude: "double?",
        location: "string?"
    }
};


export const EventItem = {
    name: "EventItem",
    primaryKey: "id",
    properties: {
        id: "string",
        eventDate: { type: "date?", indexed: true },
        startTime: "date",
        endTime: "date?",
        allDay: "bool",
        rsvp: { type: "bool", indexed: true, default: false },
        eventSummary: "EventSummary"
    }
};


export const EventSummary = {
    name: "EventSummary",
    primaryKey: "id",
    properties: {
        id: "int",
        updatedAt: "date?",
        name: "string",
        venue: "Venue",

        startTime: "date",
        endTime: "date?",

        ongoing: "bool?",
        allDay: "bool",

        categories: "Category[]",
        featured: "bool",

        multimedia: "Asset[]",

        items: { type: "linkingObjects", objectType: "EventItem", property: "eventSummary" }
    }
};


export const EventDetails = {
    name: "EventDetails",
    primaryKey: "id",
    properties: {
        id: "int",
        description: "string",
        summary: "string",
        moreInfo: "string",
        ticketUrl: "string",
        priceRange: "double[]",
        venue: "Venue"
    }
};


export default [ Category, Asset, Venue, EventItem, EventSummary, EventDetails ];
