<template>
    <div id="app">
        <p><span>JSQL AngularJS (1.6)</span> - unit testing</p>
        <table>
            <thead>
            <th>Case</th>
            <th>Duration (ms)</th>
            <th>Status</th>
            </thead>
            <tbody>
            <tr v-for="result in results">
                <td>{{result.caseName}}</td>
                <td>{{result.duration}}</td>
                <td :class="result.status.toLowerCase()">{{result.status}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    import {Cases} from "./cases";

    export default {
        name: 'app',
        components: {
        },
        data() {
            return {
                results: []
            }
        },
        created() {

            let cases = new Cases();
            cases.init(this);
            cases[cases.cases.names.caseName1]();

            var jsqlConfig = new JsqlService({
                host: window.host,
                apiKey: window.apiKey,
                devKey: window.devKey
            });

            var jsql = jsqlConfig.getInstance();

            var self = this;

            self.cases.names.caseName1 = 'Insert person';
            self[self.cases.names.caseName1] = function () {

                var start = new Date().getTime();

                var resultCallback = function (status) {
                    var end = new Date().getTime();
                    var duration = end - start;

                    self.cases.resultCase(reference, status, duration, self.cases.names.caseName1);
                    self[self.cases.names.caseName2]();

                };

                try {

                    jsql.insert("@sql insert into person (id, name, surname, age) values (nextval('person_id_seq'), :name, :surname, :age)")
                        .params({
                            name: 'Mirek',
                            surname: 'Wołyński',
                            age: 38
                        })
                        .then(function (result) {
                            console.log(self.cases.names.caseName1, result.data);
                            resultCallback('SUCCESS');
                        })
                        .catch(function (error) {
                            console.error(error);
                            resultCallback('FAILED');
                        })

                } catch (error) {
                    console.error(error);
                    resultCallback('FAILED');
                }


            };


        }

    }

</script>

<style>

    body {
        background: url('http://jsql.pl/bg1.jpg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: fixed;
        overflow-x: hidden;
        width: 100%;
        height: 100%;
        color: #fff;
    }

    table, p {
        text-align: center;
        margin: 0 auto;
        font-size: 21px;
        width: 80%;
    }

    p {
        font-size: 32px;
        padding-top: 2%;
        padding-bottom: 2%;
    }

    span {
        font-weight: bold;
    }

    tr, td, th {
        border: 1px solid lightgray;
        padding: 10px;
    }

    td.success {
        background: rgba(139, 195, 74, 0.36);
    }

    td.error {
        background: rgba(223, 0, 0, 0.36);
    }

    td.todo {
        background: rgba(255, 165, 0, 0.36);
    }

</style>
