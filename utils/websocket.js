var websock = null;
/* 接受的数据 */
var global_callback = null;

let wsUrl = "ws://60.205.153.190:8088/scoketserver/1"
wsUrl = 'ws://47.106.240.51:8888'
initWebSocket();

function initWebSocket() {
	//初始化weosocket
	try {
		websock = uni.connectSocket({
			url: wsUrl,
			complete: () => {}
		})
		init();
	} catch (e) {
		console.log("catch", e);
		reconnect();
	}
}

function init() {
	// 监听连接成功
	websock.onOpen(() => onOpen())
	// 监听接收信息
	websock.onMessage((res) => onMessage(res))
	// 监听断开
	websock.onClose(() => onClose())
	// 监听错误
	websock.onError(() => onError())
}
function onOpen(e) {
  console.log("连接成功");
}
//数据接收
function onMessage(e) {
	if (typeof global_callback === "function") {
		global_callback(e.data);
	}
}

//数据发送
function websocketsend(agentData) {
  websock.send(JSON.stringify(agentData));
}

function onClose() {
	console.log('close');
	reconnect();
}
function onError() {
	console.log('error');
	reconnect();
}

/* 短线重连 */
var lockReconnect = false; //避免重复连接
function reconnect() {
  console.log("ws reconnect");
  if (lockReconnect) {
    return;
  }
  lockReconnect = true;
  //没连接上会一直重连，设置延迟避免请求过多
  let timeout;
  timeout && clearTimeout(timeout);
  timeout = setTimeout(function() {
    initWebSocket();
    lockReconnect = false;
  }, 4000);
}

// 实际调用的方法
function sendSock(agentData, callback) {
  global_callback = callback;
  console.log(websock.readyState);
  console.log(websock.OPEN);
  console.log(websock.CONNECTING);
  if (websock.readyState === websock.OPEN) {
    //若是ws开启状态
    websocketsend(agentData);
  } else if (websock.readyState === websock.CONNECTING) {
    // 若是 正在开启状态，则等待1s后重新调用
    setTimeout(function() {
      sendSock(agentData, callback);
    }, 1000);
  } else {
    // 若未开启 ，则等待1s后重新调用
    setTimeout(function() {
      sendSock(agentData, callback);
    }, 1000);
  }
}

export {sendSock}