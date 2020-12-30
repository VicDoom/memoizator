let users = [
    {ip: '192.168.0.3', mask: '255.255.255.0'},
    {ip: '192.168.0.4', mask: '255.255.255.0'},
    {ip: '192.168.0.3', mask: '255.255.255.0'},
    {ip: '192.168.0.4', mask: '255.255.0.0'},
    {ip: '192.168.0.4', mask: '255.255.255.0'}
]

let memoize = (func) => {
    let cacheSubnets = [];
    return function() {
        let [ip, mask] = [arguments[0], arguments[1]];
        let obj = JSON.stringify({ip: ip, mask: mask});
        if (obj in cacheSubnets) {
            console.log('из кэша');
            return cacheSubnets[obj];
        } else {
            console.log('вычисленное значение');
            let res = func(ip, mask);
            cacheSubnets[obj] = res;
            return res;
        }
    }
}

let calcIpOfSubnet = memoize(
    function(ip, mask) {
        ip = ip.split('.');
        mask = mask.split('.');
        let subnet = ip.map((item, index) => item & mask[index]);
        return subnet.join('.');
    }
);

console.log(calcIpOfSubnet(users[0].ip, users[0].mask));
console.log(calcIpOfSubnet(users[1].ip, users[1].mask));
console.log(calcIpOfSubnet(users[2].ip, users[2].mask));
console.log(calcIpOfSubnet(users[3].ip, users[3].mask));
console.log(calcIpOfSubnet(users[4].ip, users[4].mask));
