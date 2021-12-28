const Dogs = artifacts.require('Dogs');
const Proxy = artifacts.require('Proxy');
const dogsUpdated = artifacts.require('dogsUpdated');

module.exports = async function (deployer, network, accounts){
    const dogs = await Dogs.deployed();
    const proxy = await Proxy.deployed(dogs.address);

    var proxyDog = await Dogs.at(proxy.address);
    await proxyDog.setNumberOfDogs(10);

    var nrOfDogs = await proxyDog.getNumberOfDogs();
    console.log("Before update: " + nrOfDogs.toNumber());

    const dogsupdated = await dogsUpdated.deployed();
    await proxy.upgrade(dogsupdated.address);

    proxyDog = await dogsUpdated.at(proxy.address);
    await proxyDog.initialize(accounts[0]);

    await proxyDog.setNumberOfDogs(30);
    nrOfDogs = await proxyDog.getNumberOfDogs();
    console.log("After update: " + nrOfDogs.toNumber());



}
