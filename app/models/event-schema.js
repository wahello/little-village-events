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


export const Event = {
    name: "Event",
    primaryKey: "id",
    properties: {
        id: "int",
        updatedAt: "date?",
        name: "string",
        venue: "Venue",

        startTime: "date",
        endTime: "date?",

        eventDate: { type: "date?", indexed: true },
        ongoing: "bool?",
        allDay: "bool",

        categories: "Category[]",
        featured: "bool",
        rsvp: { type: "bool", indexed: true, default: false },

        multimedia: "Asset[]"
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


export default [ Category, Asset, Venue, Event, EventDetails ];
