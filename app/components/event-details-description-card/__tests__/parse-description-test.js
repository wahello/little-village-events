
import { parseDescription } from "../event-details-description-card";

test( "event-details-description-card/parseDescription", () => {
    expect( parseDescription( "plain text" ) ).toMatchSnapshot();
    expect( parseDescription( "<p>plain paragraph</p>" ) ).toMatchSnapshot();
    expect( parseDescription( "<p></p><p>ignore empty paragraphs</p><p><br></p>" ) ).toMatchSnapshot();

    expect( parseDescription( "<p>Chef Baroncini always rolls out terrific dough and amazing sauces. </p><br><p>More details to come!</p><br><p><br></p>" ) ).toMatchSnapshot();

    expect( parseDescription( "<p>Series:Coming Soon</p><p>Rating:R</p><p>Runtime:96 minutes</p><p>Director:Jason Reitman</p><p>Year Released:2018</p><p>Production Country:USA</p><p>Language:English</p><p>Showtimes announced Tuesday before opening date.</p><br><p>“Charlize Theron gives a fearless performance.\" - Owen Gleiberman, Variety</p><br><p>“Jason Reitman is back at his best again.\" - Alex Billington, First Showing</p><br><p>“A bitingly funny, deeply empathetic ode to motherhood.\"-\
        Tomris Laffly, Film Journal International</p><br><p>A new comedy from Academy Award nominated director Jason Reitman (Up in the Air) and Academy Award winning screenwriter and University of Iowa graduate Diablo Cody (Juno), Marlo (Charlize Theron), a mother of three including a newborn, is gifted a nanny by her brother (Mark Duplass). Hesitant to the extravagance at first, Marlo comes to form a unique bond with the thoughtful, surprising and sometimes challenging young nanny named\
        Tully.</p>" ) ).toMatchSnapshot();
} );
