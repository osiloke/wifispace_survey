/* global WifiSurvey */
describe("Core", function() {
	it("WifiSurvey exsists", () => expect(WifiSurvey).is.not.undefined);

	it("it can send friendly messages", () => {
		var survey = new WifiSurvey();
		expect(survey.message).is.equal("hi there Dear Coder!");
		// these white spaces will be trimmed
		survey.message = "   goodbye         ";
		expect(survey.message).is.equal("goodbye Dear Coder!");
	});
});
