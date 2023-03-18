export const checkDataLayerEvent = (eventName: string, value: string) => {
    reporter.startStep(`Check ${eventName} event`);

    const event = window.dataLayer.find(e => e.name === eventName);

    expect(event).toMatchObject({
        name: eventName,
        value: value,
    });

    reporter.endStep();
};
