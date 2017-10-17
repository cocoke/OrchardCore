/*
** NOTE: This file is generated by Gulp and should not be edited directly!
** Any changes made directly to this file will be overwritten next time its asset group is processed by Gulp.
*/

///<reference path="../Lib/jquery/typings.d.ts" />
///<reference path="../Lib/jsplumb/typings.d.ts" />
///<reference path="./workflow-models.ts" />
var WorkflowEditor = /** @class */ (function () {
    function WorkflowEditor(container) {
        jsPlumb.ready(function () {
            var instance = jsPlumb.getInstance({
                DragOptions: { cursor: 'pointer', zIndex: 2000 },
                ConnectionOverlays: [
                    ["Arrow", {
                            location: 1,
                            visible: true,
                            width: 11,
                            length: 11
                        }],
                    ["Label", {
                            location: 0.5,
                            id: "label",
                            cssClass: "connection-label"
                        }]
                ],
                Container: container
            });
            // This is the paint style for the connecting lines.
            var connectorPaintStyle = {
                strokeWidth: 2,
                stroke: "#999999",
                joinstyle: "round",
                outlineStroke: "white",
                outlineWidth: 2
            };
            // And this is the hover style.
            var connectorHoverStyle = {
                strokeWidth: 3,
                stroke: "#216477",
                outlineWidth: 5,
                outlineStroke: "white"
            };
            var endpointHoverStyle = {
                fill: "#216477",
                stroke: "#216477"
            };
            var getSourceEndpointOptions = function (overlayLabel) {
                // The definition of source endpoints.
                return {
                    endpoint: "Dot",
                    anchor: "Continuous",
                    paintStyle: {
                        stroke: "#7AB02C",
                        fill: "#7AB02C",
                        radius: 7,
                        strokeWidth: 1
                    },
                    isSource: true,
                    connector: ["Flowchart", { stub: [40, 60], gap: 0, cornerRadius: 5, alwaysRespectStubs: true }],
                    connectorStyle: connectorPaintStyle,
                    hoverPaintStyle: endpointHoverStyle,
                    connectorHoverStyle: connectorHoverStyle,
                    dragOptions: {},
                    overlays: [
                        ["Label", {
                                location: [0.5, 1.5],
                                label: overlayLabel,
                                cssClass: "endpointSourceLabel",
                                visible: overlayLabel != null
                            }]
                    ]
                };
            };
            var init = function (connection) {
                connection.getOverlay("label").setLabel(connection.sourceId.substring(15) + "-" + connection.targetId.substring(15));
            };
            // Suspend drawing and initialize.
            instance.batch(function () {
                // Listen for new connections; initialise them the same way we initialise the connections at startup.
                instance.bind("connection", function (connInfo, originalEvent) {
                    init(connInfo.connection);
                });
                // Initialize activities, endpoints and connectors from model.
                var workflowModel = {
                    activities: [{
                            id: 1,
                            left: 50,
                            top: 50,
                            outcomes: [{
                                    name: "Done",
                                    displayName: "Gereed"
                                }]
                        }, {
                            id: 2,
                            left: 500,
                            top: 150,
                            outcomes: [{
                                    name: "True",
                                    displayName: "True"
                                }, {
                                    name: "False",
                                    displayName: "False"
                                }]
                        }, {
                            id: 3,
                            left: 50,
                            top: 250,
                            outcomes: [{
                                    name: "Done",
                                    displayName: "Done"
                                }]
                        }, {
                            id: 4,
                            left: 350,
                            top: 250,
                            outcomes: [{
                                    name: "Done",
                                    displayName: "Done"
                                }]
                        }
                    ],
                    connections: [{
                            outcomeName: "Done",
                            sourceId: 1,
                            targetId: 2
                        }, {
                            outcomeName: "True",
                            sourceId: 2,
                            targetId: 3
                        }, {
                            outcomeName: "False",
                            sourceId: 2,
                            targetId: 4
                        }
                    ]
                };
                for (var _i = 0, _a = workflowModel.activities; _i < _a.length; _i++) {
                    var activityModel = _a[_i];
                    // Generate activity HTML element.
                    var activityNode = $("<div class=\"activity\" style=\"left:" + activityModel.left + "px; top:" + activityModel.top + "px;\"></div>");
                    var activityElement = activityNode[0];
                    // Add activity HTML element to the canvas.
                    $(container).append(activityNode);
                    // Make the activity draggable.
                    instance.draggable(activityElement, { grid: [20, 20] });
                    // Configure the activity as a target.
                    instance.makeTarget(activityElement, {
                        dropOptions: { hoverClass: "hover" },
                        anchor: "Continuous",
                        endpoint: ["Blank", { radius: 8 }]
                    });
                    // Add source endpoints.
                    var hasMultipleOutcomes = activityModel.outcomes.length > 1;
                    for (var _b = 0, _c = activityModel.outcomes; _b < _c.length; _b++) {
                        var outcome = _c[_b];
                        var sourceEndpointOptions = getSourceEndpointOptions(hasMultipleOutcomes ? outcome.displayName : null);
                        instance.addEndpoint(activityElement, sourceEndpointOptions);
                    }
                }
                instance.bind("click", function (conn, originalEvent) {
                    instance.deleteConnection(conn);
                });
                instance.bind("connectionDrag", function (connection) {
                    console.log("connection " + connection.id + " is being dragged. suspendedElement is ", connection.suspendedElement, " of type ", connection.suspendedElementType);
                });
                instance.bind("connectionDragStop", function (connection) {
                    console.log("connection " + connection.id + " was dragged");
                });
                instance.bind("connectionMoved", function (params) {
                    console.log("connection " + params.connection.id + " was moved");
                });
            });
            this.jsPlumbInstance = instance;
        });
    }
    return WorkflowEditor;
}());
$.fn.workflowEditor = function () {
    var workflowEditor = new WorkflowEditor(this[0]);
    return this;
};
$(document).ready(function () {
    $('.workflow-editor-canvas').workflowEditor();
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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Q0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBR0wscUJBQUM7QUFBRCxDQTFMQSxBQTBMQyxJQUFBO0FBRUQsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxjQUFjLEdBQUc7SUFDbEIsSUFBSSxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakQsTUFBTSxDQUFDLElBQUksQ0FBQztBQUNoQixDQUFDLENBQUM7QUFFRixDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2QsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDbEQsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoib3JjaGFyZC53b3JrZmxvd3Mtd29ya2Zsb3ctZWRpdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vTGliL2pxdWVyeS90eXBpbmdzLmQudHNcIiAvPlxyXG4vLy88cmVmZXJlbmNlIHBhdGg9XCIuLi9MaWIvanNwbHVtYi90eXBpbmdzLmQudHNcIiAvPlxyXG4vLy88cmVmZXJlbmNlIHBhdGg9XCIuL3dvcmtmbG93LW1vZGVscy50c1wiIC8+XHJcblxyXG5jbGFzcyBXb3JrZmxvd0VkaXRvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXI6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAganNQbHVtYi5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IGpzUGx1bWIuZ2V0SW5zdGFuY2Uoe1xyXG5cclxuICAgICAgICAgICAgICAgIERyYWdPcHRpb25zOiB7IGN1cnNvcjogJ3BvaW50ZXInLCB6SW5kZXg6IDIwMDAgfSxcclxuICAgICAgICAgICAgICAgIENvbm5lY3Rpb25PdmVybGF5czogW1xyXG4gICAgICAgICAgICAgICAgICAgIFtcIkFycm93XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoOiAxMVxyXG4gICAgICAgICAgICAgICAgICAgIH1dLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcIkxhYmVsXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246IDAuNSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibGFiZWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzQ2xhc3M6IFwiY29ubmVjdGlvbi1sYWJlbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBDb250YWluZXI6IGNvbnRhaW5lclxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgdGhlIHBhaW50IHN0eWxlIGZvciB0aGUgY29ubmVjdGluZyBsaW5lcy5cclxuICAgICAgICAgICAgdmFyIGNvbm5lY3RvclBhaW50U3R5bGUgPSB7XHJcbiAgICAgICAgICAgICAgICBzdHJva2VXaWR0aDogMixcclxuICAgICAgICAgICAgICAgIHN0cm9rZTogXCIjOTk5OTk5XCIsXHJcbiAgICAgICAgICAgICAgICBqb2luc3R5bGU6IFwicm91bmRcIixcclxuICAgICAgICAgICAgICAgIG91dGxpbmVTdHJva2U6IFwid2hpdGVcIixcclxuICAgICAgICAgICAgICAgIG91dGxpbmVXaWR0aDogMlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gQW5kIHRoaXMgaXMgdGhlIGhvdmVyIHN0eWxlLlxyXG4gICAgICAgICAgICB2YXIgY29ubmVjdG9ySG92ZXJTdHlsZSA9IHtcclxuICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoOiAzLFxyXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMyMTY0NzdcIixcclxuICAgICAgICAgICAgICAgIG91dGxpbmVXaWR0aDogNSxcclxuICAgICAgICAgICAgICAgIG91dGxpbmVTdHJva2U6IFwid2hpdGVcIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGVuZHBvaW50SG92ZXJTdHlsZSA9IHtcclxuICAgICAgICAgICAgICAgIGZpbGw6IFwiIzIxNjQ3N1wiLFxyXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMyMTY0NzdcIlxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGdldFNvdXJjZUVuZHBvaW50T3B0aW9ucyA9IGZ1bmN0aW9uKG92ZXJsYXlMYWJlbDogc3RyaW5nKTogRW5kcG9pbnQge1xyXG4gICAgICAgICAgICAgICAgLy8gVGhlIGRlZmluaXRpb24gb2Ygc291cmNlIGVuZHBvaW50cy5cclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5kcG9pbnQ6IFwiRG90XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYW5jaG9yOlwiQ29udGludW91c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhaW50U3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiM3QUIwMkNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbDogXCIjN0FCMDJDXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhZGl1czogNyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg6IDFcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGlzU291cmNlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3RvcjogW1wiRmxvd2NoYXJ0XCIsIHsgc3R1YjogWzQwLCA2MF0sIGdhcDogMCwgY29ybmVyUmFkaXVzOiA1LCBhbHdheXNSZXNwZWN0U3R1YnM6IHRydWUgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdG9yU3R5bGU6IGNvbm5lY3RvclBhaW50U3R5bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgaG92ZXJQYWludFN0eWxlOiBlbmRwb2ludEhvdmVyU3R5bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdG9ySG92ZXJTdHlsZTogY29ubmVjdG9ySG92ZXJTdHlsZSxcclxuICAgICAgICAgICAgICAgICAgICBkcmFnT3B0aW9uczoge30sXHJcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgW1wiTGFiZWxcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246IFswLjUsIDEuNV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogb3ZlcmxheUxhYmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzQ2xhc3M6IFwiZW5kcG9pbnRTb3VyY2VMYWJlbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogb3ZlcmxheUxhYmVsICE9IG51bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoY29ubmVjdGlvbjogQ29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5nZXRPdmVybGF5KFwibGFiZWxcIikuc2V0TGFiZWwoY29ubmVjdGlvbi5zb3VyY2VJZC5zdWJzdHJpbmcoMTUpICsgXCItXCIgKyBjb25uZWN0aW9uLnRhcmdldElkLnN1YnN0cmluZygxNSkpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gU3VzcGVuZCBkcmF3aW5nIGFuZCBpbml0aWFsaXplLlxyXG4gICAgICAgICAgICBpbnN0YW5jZS5iYXRjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBMaXN0ZW4gZm9yIG5ldyBjb25uZWN0aW9uczsgaW5pdGlhbGlzZSB0aGVtIHRoZSBzYW1lIHdheSB3ZSBpbml0aWFsaXNlIHRoZSBjb25uZWN0aW9ucyBhdCBzdGFydHVwLlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuYmluZChcImNvbm5lY3Rpb25cIiwgZnVuY3Rpb24gKGNvbm5JbmZvLCBvcmlnaW5hbEV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdChjb25uSW5mby5jb25uZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEluaXRpYWxpemUgYWN0aXZpdGllcywgZW5kcG9pbnRzIGFuZCBjb25uZWN0b3JzIGZyb20gbW9kZWwuXHJcbiAgICAgICAgICAgICAgICB2YXIgd29ya2Zsb3dNb2RlbDogV29ya2Zsb3dzLldvcmtmbG93ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2aXRpZXM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IDUwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiA1MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dGNvbWVzOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiRG9uZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIkdlcmVlZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IDUwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogMTUwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0Y29tZXM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJUcnVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiVHJ1ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkZhbHNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiRmFsc2VcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IDUwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAyNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRjb21lczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkRvbmVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJEb25lXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAzNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IDI1MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dGNvbWVzOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiRG9uZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIkRvbmVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dGNvbWVOYW1lOiBcIkRvbmVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlSWQ6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldElkOiAyXHJcbiAgICAgICAgICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dGNvbWVOYW1lOiBcIlRydWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlSWQ6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldElkOiAzXHJcbiAgICAgICAgICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dGNvbWVOYW1lOiBcIkZhbHNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZUlkOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRJZDogNFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGFjdGl2aXR5TW9kZWwgb2Ygd29ya2Zsb3dNb2RlbC5hY3Rpdml0aWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gR2VuZXJhdGUgYWN0aXZpdHkgSFRNTCBlbGVtZW50LlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhY3Rpdml0eU5vZGUgPSAkKGA8ZGl2IGNsYXNzPVwiYWN0aXZpdHlcIiBzdHlsZT1cImxlZnQ6JHthY3Rpdml0eU1vZGVsLmxlZnR9cHg7IHRvcDoke2FjdGl2aXR5TW9kZWwudG9wfXB4O1wiPjwvZGl2PmApO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhY3Rpdml0eUVsZW1lbnQgPSBhY3Rpdml0eU5vZGVbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIGFjdGl2aXR5IEhUTUwgZWxlbWVudCB0byB0aGUgY2FudmFzLlxyXG4gICAgICAgICAgICAgICAgICAgICQoY29udGFpbmVyKS5hcHBlbmQoYWN0aXZpdHlOb2RlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSB0aGUgYWN0aXZpdHkgZHJhZ2dhYmxlLlxyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLmRyYWdnYWJsZShhY3Rpdml0eUVsZW1lbnQsIHsgZ3JpZDogWzIwLCAyMF0gfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENvbmZpZ3VyZSB0aGUgYWN0aXZpdHkgYXMgYSB0YXJnZXQuXHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UubWFrZVRhcmdldChhY3Rpdml0eUVsZW1lbnQsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcE9wdGlvbnM6IHsgaG92ZXJDbGFzczogXCJob3ZlclwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuY2hvcjogXCJDb250aW51b3VzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZHBvaW50OlsgXCJCbGFua1wiLCB7IHJhZGl1czogOCB9IF1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIHNvdXJjZSBlbmRwb2ludHMuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhhc011bHRpcGxlT3V0Y29tZXMgPSBhY3Rpdml0eU1vZGVsLm91dGNvbWVzLmxlbmd0aCA+IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgb3V0Y29tZSBvZiBhY3Rpdml0eU1vZGVsLm91dGNvbWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzb3VyY2VFbmRwb2ludE9wdGlvbnMgPSBnZXRTb3VyY2VFbmRwb2ludE9wdGlvbnMoaGFzTXVsdGlwbGVPdXRjb21lcyA/IG91dGNvbWUuZGlzcGxheU5hbWUgOiBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UuYWRkRW5kcG9pbnQoYWN0aXZpdHlFbGVtZW50LCBzb3VyY2VFbmRwb2ludE9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5iaW5kKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGNvbm4sIG9yaWdpbmFsRXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5kZWxldGVDb25uZWN0aW9uKGNvbm4pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuYmluZChcImNvbm5lY3Rpb25EcmFnXCIsIGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb25uZWN0aW9uIFwiICsgY29ubmVjdGlvbi5pZCArIFwiIGlzIGJlaW5nIGRyYWdnZWQuIHN1c3BlbmRlZEVsZW1lbnQgaXMgXCIsIGNvbm5lY3Rpb24uc3VzcGVuZGVkRWxlbWVudCwgXCIgb2YgdHlwZSBcIiwgY29ubmVjdGlvbi5zdXNwZW5kZWRFbGVtZW50VHlwZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5iaW5kKFwiY29ubmVjdGlvbkRyYWdTdG9wXCIsIGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb25uZWN0aW9uIFwiICsgY29ubmVjdGlvbi5pZCArIFwiIHdhcyBkcmFnZ2VkXCIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuYmluZChcImNvbm5lY3Rpb25Nb3ZlZFwiLCBmdW5jdGlvbiAocGFyYW1zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb25uZWN0aW9uIFwiICsgcGFyYW1zLmNvbm5lY3Rpb24uaWQgKyBcIiB3YXMgbW92ZWRcIik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmpzUGx1bWJJbnN0YW5jZSA9IGluc3RhbmNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUganNQbHVtYkluc3RhbmNlOiBqc1BsdW1iSW5zdGFuY2U7XHJcbn1cclxuXHJcbiQuZm4ud29ya2Zsb3dFZGl0b3IgPSBmdW5jdGlvbiAodGhpczogSlF1ZXJ5KTogSlF1ZXJ5IHtcclxuICAgIGxldCB3b3JrZmxvd0VkaXRvciA9IG5ldyBXb3JrZmxvd0VkaXRvcih0aGlzWzBdKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgJCgnLndvcmtmbG93LWVkaXRvci1jYW52YXMnKS53b3JrZmxvd0VkaXRvcigpO1xyXG59KTsiXX0=
