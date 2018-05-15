
import parseDescription, { parseAsDetails } from "../parse-description";

describe( "event-details-description-card/parseDescription", () => {

    it( "parses plain description", () => {
        expect( parseDescription( "plain text" ) ).toMatchSnapshot();
        expect( parseDescription( "<p>plain paragraph</p>" ) ).toMatchSnapshot();
    } )

    it( "ignores empty paragraphs", () => {
        expect( parseDescription( "<p></p><p>ignore empty paragraphs</p><p><br></p>" ) ).toMatchSnapshot();
        expect( parseDescription( "<p>Chef Baroncini always rolls out terrific dough and amazing sauces. </p><br><p>More details to come!</p><br><p><br></p>" ) ).toMatchSnapshot();
    } );

    it( "extracts details", () => {
        expect( parseDescription( "<p>Series:Coming Soon</p><p>Rating:R</p><p>Runtime:96 minutes</p><p>Director:Jason Reitman</p><p>Year Released:2018</p><p>Production Country:USA</p><p>Language:English</p><p>Showtimes announced Tuesday before opening date.</p><br><p>“Charlize Theron gives a fearless performance.\" - Owen Gleiberman, Variety</p><br><p>“Jason Reitman is back at his best again.\" - Alex Billington, First Showing</p><br><p>“A bitingly funny, deeply empathetic ode to motherhood.\"-\
            Tomris Laffly, Film Journal International</p><br><p>A new comedy from Academy Award nominated director Jason Reitman (Up in the Air) and Academy Award winning screenwriter and University of Iowa graduate Diablo Cody (Juno), Marlo (Charlize Theron), a mother of three including a newborn, is gifted a nanny by her brother (Mark Duplass). Hesitant to the extravagance at first, Marlo comes to form a unique bond with the thoughtful, surprising and sometimes challenging young nanny named\
            Tully.</p>" ) ).toMatchSnapshot();

        expect( parseDescription( "<p>Date/Time: Tuesdays, May 1, 8, and 15, 6-8pm</p><br><p>Instructor: Violet A.</p><br><p>The only thing you need to start making comics is a desire to start making comics. But diving in can still be intimidating, so why not join a group of people doing the same thing in a supportive environment? Comics for Anybody will be just that: you will be making your own work, however you want to, but with guidance on how to start and how to keep going. We will share\
            ideas and troubleshoot and support each other. The only things you need are an idea, your preferred writing and drawing tools, and a desire to start. You’re an anybody, you can do it!</p><br><p>Prerequisite/skill level: Beginner</p><br><p>Age group: 14+</p><br><p>Instructor Bio: Violet Austerlitz transplanted herself from Missouri to Iowa City five years ago with no plan, and she’s quite confident that it was a good idea. She studied printmaking at Truman State University, focusing \
            on silkscreen and letterpress, and has kept up her art practice as a member of the Iowa City Press Co-op. She also writes and draws a webcomic called The Satanic Mechanic.</p><br><p><br></p>" ) ).toMatchSnapshot();
    } );


    describe( "parseAsDetails", () => {

        it( "parses basic cases", () => {
            expect( parseAsDetails( "Series:Coming Soon" ) ).toMatchSnapshot();
            expect( parseAsDetails( "Rating:R" ) ).toMatchSnapshot();
            expect( parseAsDetails( "Year Released: 2018" ) ).toMatchSnapshot();
            expect( parseAsDetails( "Age: 14+" ) ).toMatchSnapshot();
            expect( parseAsDetails( "Instructor: Violet A. Blue" ) ).toMatchSnapshot();
            expect( parseAsDetails( "Age restrictions: 19+ After 10 pm." ) ).toMatchSnapshot();
            expect( parseAsDetails( "Director:Frank Henenlotter (Frankenhooker)" ) ).toMatchSnapshot();
            expect( parseAsDetails( "Instructor: Benjamin Revis Longname, UI Scientific Glass Blower" ) ).toMatchSnapshot();
        } );

        it( "allows for (limited) punctuation in prefixes", () => {
            expect( parseAsDetails( "Av. Rating: 9" ) ).toMatchSnapshot();
            expect( parseAsDetails( "Date/Time: Tuesdays, May 1, 8, and 15, 6-8pm" ) ).toMatchSnapshot();
            expect( parseAsDetails( "Prerequisite/skill level: Beginner" ) ).toMatchSnapshot();
            expect( parseAsDetails( "Skill + thrill level: Beginner" ) ).toMatchSnapshot();
            expect( parseAsDetails( "Skull & bones level: Beginner" ) ).toMatchSnapshot();
        } );

        it( "ignores mismatching text", () => {
            expect( parseAsDetails( "Just some text" ) ).toBeNull();
            expect( parseAsDetails( "Some text that ends with a colon:" ) ).toBeNull();
            expect( parseAsDetails( ":Some text that starts with a colon" ) ).toBeNull();
        } );

        it( "ignores time", () => {
            expect( parseAsDetails( "Starts at 7:00pm" ) ).toBeNull();
        } );

        it( "ignores long prefixes & values", () => {
            expect( parseAsDetails( "The prefix here is a bit too long: 34" ) ).toBeNull();
            expect( parseAsDetails( "Instructor Bio: Violet Austerlitz transplanted herself from Missouri to Iowa City five years ago with no plan, and she’s quite confident that it was a good idea." ) ).toBeNull();
        } );

    } );

} );
